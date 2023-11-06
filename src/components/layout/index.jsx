import { Outlet } from "react-router-dom";
import Group from "../../page/Group";
import Home from "../../page/Home";
import Todo from "../../page/Todo";
import Navbar from "../navbar/Navbar";
import { useState } from "react";

const Layout = () => {
  const [nav, setnav] = useState(true);

  return (
    <div className="flex">
     

      <Navbar nav={nav} setnav={setnav} />
  

      <div className={`${nav?"sm:ml-28":'sm:ml-56 md:ml-40 lg:ml-60 '} w-full duration-300`}> <Outlet />    </div>
    </div>
  );
};

export default Layout;
