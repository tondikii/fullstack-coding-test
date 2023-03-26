import {useState} from "react";
import {useNavigate} from "react-router-dom";
import apiInstance from "../../configs/api";
import StyledInput from "../../components/inputs/Styled";
import ButtonRounded from "../../components/buttons/Rounded";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const handleChangeValue = (e) => {
    const {name, value} = e.target;
    setLoginForm({...loginForm, [name]: value});
    setErrors({
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await apiInstance.post("/users/login", {
        username: loginForm.username,
        password: loginForm.password,
      });
      localStorage.access_token = data?.access_token;
      await navigate("/");
      Swal.fire({
        title: "Login Successful",
        icon: "success",
      });
    } catch (err) {
      if (err?.response?.data?.error) {
        const error = err.response.data.error;
        if (error === "Username or Password is Required") {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
            text: error,
          });
        } else if (
          error.split(" ").find((el) => el.toLowerCase() === "username")
        ) {
          setErrors({...errors, username: error});
        } else if (
          error.split(" ").find((el) => el.toLowerCase() === "password")
        ) {
          setErrors({...errors, password: error});
        }
      }
    }
  };
  console.log({errors});

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="p-8 flex flex-col justify-center items-center w-1/3">
        <h1 className="text-3xl font-bold mb-8">Login Page</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <StyledInput
              name="username"
              placeholder="username"
              onChange={(e) => handleChangeValue(e)}
              value={loginForm.username}
            />
            {errors?.username && (
              <p className="text-sm text-red-500 font-medium">
                {`${errors?.username}${
                  errors?.username[errors?.username.length - 1] === "!"
                    ? ""
                    : "!"
                }`}
              </p>
            )}
          </div>
          <div className="w-full mt-3">
            <StyledInput
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => handleChangeValue(e)}
              value={loginForm.password}
            />
            {errors?.password && (
              <p className="text-sm text-red-500 font-medium">
                {`${errors?.password}${
                  errors?.password[errors?.password.length - 1] === "!"
                    ? ""
                    : "!"
                }`}
              </p>
            )}
          </div>
          <ButtonRounded
            type="submit"
            className="bg-black text-white mt-6 font-medium"
            onClick={handleSubmit}
          >
            Login
          </ButtonRounded>
          <ButtonRounded
            type="button"
            className="bg-white text-zinc-900 border-2 border-black mt-4 font-medium"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </ButtonRounded>
        </form>
      </div>
    </div>
  );
}
