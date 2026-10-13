import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Public;