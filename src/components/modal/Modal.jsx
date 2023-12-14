import React from "react";

const Modal = ({ children, status, setstatus }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-20   ${
        !status && "opacity-0 hidden duration-700"
      } w-screen h-screen bg-gray-400 bg-opacity-60 flex items-end  pb-10 md:pb-0 md:items-center justify-center `}
    >
      <div className="bg-white w-11/12 md:w-6/12   p-4 rounded-md z-30 relative">
        {children}{" "}
        <p
          onClick={() => setstatus(false)}
          className="absolute  top-1 right-1 rounded-md  p-1 md:p-2  bg-yellow-100 cursor-pointer border border-red-300 w-fit text-red-500 font-bold"
        >
          close
        </p>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full z-10   "
        onClick={() => setstatus(false)}
      ></div>
    </div>
  );
};

export default Modal;
