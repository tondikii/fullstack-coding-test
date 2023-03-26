import {Outlet} from "react-router-dom";
import Navbar from "../navigators/Navbar";
const Wrapper = () => {
  return (
    // <div className="flex flex-1 flex-col min-h-screen justify-between">
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Wrapper;
