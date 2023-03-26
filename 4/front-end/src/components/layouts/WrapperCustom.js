import Navbar from "../navigators/Navbar";
function WrapperCustom({children}) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

export default WrapperCustom;
