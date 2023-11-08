import React, { useState } from "react";
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { redirect, useLocation, Link } from "react-router-dom";
import { BsCardChecklist, BsFillTrashFill, BsList } from "react-icons/bs";
import { TbBuildingCommunity } from "react-icons/tb";
import { FaArrowsSpin } from "react-icons/fa6";
import avatarlogo from "../../assets/avatar.jpg";
import "./index.css";
import { MdAccountCircle, MdHome, MdQuestionAnswer } from "react-icons/md";
import { singout } from "../../firebase/services/AllService";
import { useDispatch, useSelector } from "react-redux";
import { setlogout } from "../../features/Auth/authSlice";

const Navbar = ({ nav, setnav }) => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();
  const handlesingout = () => {
    singout();
    dispatch(setlogout());
  };
  return (
    <>
      {/* destop navbar  */}

      <div
        className={`hidden sm:block ${
          nav ? "w-[100px] " : "  sm:w-4/12  md:w-2/12"
        }  h-screen   bg-slate-200 fixed top-0 left-0 z-20   duration-300 prevent-select `}
      >
        <BsList
          onClick={() => setnav(!nav)}
          className={`absolute right-[-5px]   top-4 bg-indigo-400 text-white h-10 w-8  ${
            nav ? "border-r-0 right-[-15px] border" : "border-r-4 "
          }  rounded-md cursor-pointer`}
        />
        {/* profile div  */}

        <div className=" p-4 ">
          <div className="space-y-2">
            <img
              src={avatarlogo}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-offset-2 border ring-indigo-400 hover:ring-offset-0 transition cursor-pointer"
              alt="userlogo"
            />
            <div
              className={`bg-indigo-400 p-4 rounded-md text-white font-semibold  shadow-md  ${
                nav && "hidden"
              } overflow-hidden`}
            >
              <p>user</p>
              <p>{user.email}</p>
              {/* <p>
              Account type :{" "}
              <span className="bg-white text-indigo-400 px-2 rounded-md cursor-pointer ">
                local
              </span>
            </p> */}
            </div>
          </div>
          <div className={`mt-4 ${nav ? "space-x-0 space-y-2" : "space-x-2"}`}>
            <button className="bg-indigo-400 text-white font-semibold px-3 rounded-md ">
              <Link to={"/account"}>Edit</Link>
            </button>
            <button
              onClick={handlesingout}
              className="bg-red-500 text-white font-semibold px-2 rounded-md "
            >
              logout
            </button>
          </div>
        </div>

        {/* profile div  */}

        <ul className=" p-3 space-y-2 border-r-2 bg-white m-2 rounded-md   ">
          <li>
            {" "}
            <Link
              to={"/"}
              className={`flex items-center  ${
                nav ? "justify-center" : "justify-between"
              } gap-3 hover:bg-indigo-400 ${
                location.pathname == "/" && "bg-indigo-400 text-white"
              }  cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
            >
              {!nav && "Home"}
              <AiFillHome className={`${nav && "text-2xl"}`} />
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              to={"/todo"}
              className={`flex items-center  ${
                nav ? "justify-center" : "justify-between"
              } ${
                location.pathname == "/todo" && "bg-indigo-400 text-white"
              } gap-3 hover:bg-indigo-400   cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
            >
              {" "}
              {!nav && "Todo"}{" "}
              <BsCardChecklist className={`${nav && "text-2xl"}`} />
            </Link>{" "}
          </li>{" "}
          <li
            className={`flex items-center  ${
              nav ? "justify-center" : "justify-between"
            } gap-3 hover:bg-indigo-400   cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
          >
            {" "}
            {!nav && "Add list"}{" "}
            <AiOutlineAppstoreAdd className={`${nav && "text-2xl"}`} />
          </li>
          <li>
            {" "}
            <Link
              to={"/community"}
              className={`flex items-center  ${
                nav ? "justify-center" : "justify-between"
              } ${
                location.pathname == "/community" && "bg-indigo-400 text-white"
              } gap-3 hover:bg-indigo-400   cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
            >
              {" "}
              {!nav && "Community"}{" "}
              <TbBuildingCommunity className={`${nav && "text-2xl"}`} />
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link
              to={"/setting"}
              className={`flex items-center  ${
                nav ? "justify-center" : "justify-between"
              } ${
                location.pathname == "/setting" && "bg-indigo-400 text-white"
              } gap-3 hover:bg-indigo-400   cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
            >
              {" "}
              {!nav && "Setting"}{" "}
              <AiFillSetting className={`${nav && "text-2xl"}`} />
            </Link>{" "}
          </li>{" "}
          <li
            className={`flex items-center  ${
              nav ? "justify-center" : "justify-between"
            } gap-3 hover:bg-indigo-400   cursor-pointer transition  p-1 px-2 bg-gray-200 hover:text-white rounded-md font-semibold`}
          >
            {" "}
            {!nav && "Recover"}{" "}
            <FaArrowsSpin className={`${nav && "text-2xl"}`} />
          </li>
        </ul>
        <div className="bg-gray-400 text-black font-semibold absolute bottom-5 right-5 flex rounded-md px-4 py-1 gap-2 ">
          {!nav && "About"}{" "}
          <MdQuestionAnswer className=" rounded-md cursor-pointer      h-6 w-6" />
        </div>
      </div>
      {/* destop navbar  */}

      {/* moble navbar */}
      <div className="sm:hidden z-20   fixed bottom-0 left-0 w-full p-3 bg-indigo-400 rounded-t-3xl ring-2 ring-indigo-400 ring-offset-2 ">
        <div className="flex gap-3 justify-between px-5">
          <Link to={"/"}>
            <MdHome
              className={`duration-300 h-12 w-12 bg-white rounded-md p-1   ${
                location.pathname == "/" && " scale-125"
              } `}
            />{" "}
          </Link>

          <Link to={"/todo"}>
            <BsCardChecklist
              className={`duration-300 h-12 w-12 bg-white rounded-md p-1   ${
                location.pathname == "/todo" && " scale-125"
              } `}
            />
          </Link>
          <Link to={"/community"}>
            <TbBuildingCommunity
              className={`duration-300 h-12 w-12 bg-white rounded-md p-1   ${
                location.pathname == "/community" && " scale-125"
              } `}
            />
          </Link>
          <Link to={"/setting"}>
            <AiFillSetting
              className={`duration-300 h-12 w-12 bg-white rounded-md p-1   ${
                location.pathname == "/setting" && " scale-125"
              } `}
            />
          </Link>

          <Link to={"/account"}>
            <MdAccountCircle
              className={`duration-300 h-12 w-12 bg-white rounded-md p-1  ${
                location.pathname == "/account" && " scale-125"
              }`}
            />
          </Link>
        </div>
      </div>
      {/* moble navbar */}
    </>
  );
};

export default Navbar;
