import {useState} from "react";
import {useNavigate} from "react-router-dom";
import apiInstance from "../../configs/api";
import StyledInput from "../../components/inputs/Styled";
import ButtonRounded from "../../components/buttons/Rounded";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [registerForm, setLoginForm] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: [],
    username: [],
    password: [],
  });
  const handleChangeValue = (e) => {
    const {name, value} = e.target;
    setLoginForm({...registerForm, [name]: value});
    setErrors({
      name: [],
      username: [],
      password: [],
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data: dataRegister} = await apiInstance.post(
        "/users/register",
        registerForm
      );
      if (dataRegister?.user) {
        const {data: dataLogin} = await apiInstance.post("/users/login", {
          username: registerForm.username,
          password: registerForm.password,
        });
        localStorage.access_token = dataLogin?.access_token;
        await navigate("/");
        Swal.fire({
          title: "Login Successful",
          icon: "success",
        });
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        const error = err.response.data.error;
        error.forEach((each) => {
          if (
            each.split(" ").find((el) => el.toLowerCase() === "password") !==
            undefined
          ) {
            setErrors((prevState) => {
              return {...prevState, password: [...errors.password, each]};
            });
          } else if (
            each.split(" ").find((el) => el.toLowerCase() === "name") !==
            undefined
          ) {
            setErrors((prevState) => {
              return {...prevState, name: [...errors.name, each]};
            });
          } else if (
            each.split(" ").find((el) => el.toLowerCase() === "username") !==
            undefined
          ) {
            setErrors((prevState) => {
              return {
                ...prevState,
                username: [...errors.username, each],
              };
            });
          }
        });
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="p-8 flex flex-col justify-center items-center w-1/3">
        <h1 className="text-3xl font-bold mb-8">Register</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <StyledInput
              name="name"
              placeholder="name"
              onChange={(e) => handleChangeValue(e)}
              value={registerForm.name}
            />
            {errors.name.length > 0 &&
              errors.name.map((err) => (
                <p className="text-sm text-red-500 font-medium">
                  {`${err}${err[err.length - 1] === "!" ? "" : "!"}`}
                </p>
              ))}
          </div>
          <div className="w-full mt-3">
            <StyledInput
              name="username"
              placeholder="username"
              onChange={(e) => handleChangeValue(e)}
              value={registerForm.username}
            />
            {errors.username.length > 0 &&
              errors.username.map((err) => (
                <p className="text-sm text-red-500 font-medium">
                  {`${err}${err[err.length - 1] === "!" ? "" : "!"}`}
                </p>
              ))}
          </div>
          <div className="w-full mt-3">
            <StyledInput
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => handleChangeValue(e)}
              value={registerForm.password}
            />
            {errors.password.length > 0 &&
              errors.password.map((err) => (
                <p className="text-sm text-red-500 font-medium">
                  {`${err}${err[err.length - 1] === "!" ? "" : "!"}`}
                </p>
              ))}
          </div>
          <ButtonRounded
            type="button"
            className="bg-black text-white mt-6 font-medium"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </ButtonRounded>
          <ButtonRounded
            type="submit"
            className="bg-white text-zinc-900 border-2 border-black mt-4 font-medium"
            onClick={handleSubmit}
          >
            Register
          </ButtonRounded>
        </form>
      </div>
    </div>
  );
}
