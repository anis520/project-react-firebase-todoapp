import React from "react";
import { AiOutlineDisconnect } from "react-icons/ai";
import { BsFillSunFill, BsSun, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../features/Auth/authSlice";

const Setting = () => {
  const { mode } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleMode = () => {
    dispatch(setDarkMode());
  };

  return (
    <div className="p-5  ">
      <p className="font-semibold text-xl dark:text-white">Setting UI</p>
      <div className="p-5 bg-white border rounded-md shadow-lg my-5 md:w-5/12 dark:bg-slate-800">
        <p className="font-semibold mb-3 dark:text-white ">Mode</p>

        <div className="flex gap-3">
          {mode == "dark" ? (
            <button
              onClick={handleMode}
              className={`bg-white text-base border-2 px-4   rounded-md font-semibold flex items-center gap-3 py-1  ${
                mode == "light" && "bg-slate-800 text-white"
              }   `}
            >
              Light <BsSun />
            </button>
          ) : (
            <button
              onClick={handleMode}
              className={`bg-white text-base border-2 px-4   rounded-md font-semibold flex items-center gap-3 py-1  ${
                mode == "light" && "bg-slate-800 text-white"
              }   `}
            >
              Dark <BsSunFill />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
