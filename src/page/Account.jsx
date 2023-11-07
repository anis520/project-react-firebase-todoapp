import React from "react";
import { singout } from "../firebase/services/AllService";
import { setlogout } from "../features/Auth/authSlice";
import { useDispatch } from "react-redux";

const Account = () => {
  const dispatch = useDispatch();
  const handlesingout = () => {
    singout();
    dispatch(setlogout());
  };

  return (
    <div className="p-5">
      Account
      <button
        className="block my-5 w-fit p-2 text-white bg-red-400 font-semibold  rounded-md"
        onClick={handlesingout}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
