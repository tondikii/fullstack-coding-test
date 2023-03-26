import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.access_token ? true : false;
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex flex-row justify-between items-center w-full fixed py-6 px-24 bg-white drop-shadow-md">
      <Link to="/" className="text-xl font-bold">
        Home
      </Link>
      {isLoggedIn ? (
        <div className="flex flex-row">
          <Link to="/" className="text-xl font-bold mr-8">
            My Work
          </Link>
          <span
            role="button"
            className="text-xl font-bold text-red-500"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link to="/login" className="text-xl font-bold">
          Login
        </Link>
      )}
    </div>
  );
}
