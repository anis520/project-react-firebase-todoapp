import { Outlet } from "react-router-dom";
import Group from "../../page/Group";
import Home from "../../page/Home";
import Todo from "../../page/Todo";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Layout;
