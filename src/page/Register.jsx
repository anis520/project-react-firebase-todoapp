import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setlogout } from "../features/Auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [input, setinput] = useState({ email: "", password: "", name: "" });
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handleRegister = async () => {
    try {
      setinput({ email: "", password: "" });
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      dispatch(setlogout());
      signOut(auth);

      toast("register successful");
    } catch (error) {
      toast.error("some going wrong");
    }
  };

  const handlegoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-indigo-200">
      <div className="bg-white p-5   w-10/12 sm:w-7/12 md:w-4/12   rounded-xl shadow-lg hover:scale-105 duration-300 ">
        <p className="text-slate-500 font-semibold text-xl mb-2 flex items-center gap-3">
          <span>Register </span>
          <span>
            <AiOutlineLogin className="text-indigo-400 h-9 w-9" />{" "}
          </span>
        </p>{" "}
        <hr className="w-full h-2 bg-indigo-400 rounded-md" />
        <div className="space-y-3 py-3">
          {/* <label className="font-semibold text-slate-500" htmlFor="name">
            Enter name :
          </label>
          <input
            onChange={handleInput}
            className="w-full border outline-slate-300 p-1 rounded-md "
            value={input.name}
            type="name"
            name="name"
            id="name"
          /> */}
          <label className="font-semibold text-slate-500" htmlFor="email">
            Enter email :
          </label>
          <input
            onChange={handleInput}
            className="w-full border outline-slate-300 p-1 rounded-md "
            value={input.email}
            type="email"
            name="email"
            id="email"
          />

          <label className="font-semibold text-slate-500 " htmlFor="password">
            Enter password :
          </label>
          <input
            onChange={handleInput}
            value={input.password}
            className="w-full border outline-slate-300 p-1 rounded-md"
            type="password"
            name="password"
            id="password"
          />
          <button
            onClick={handleRegister}
            className="w-full p-2 text-white bg-indigo-400 rounded-xl  font-semibold"
          >
            register
          </button>
          <p className="cursor-pointer text-indigo-700 font-semibold text-center">
            <Link to="/login">Have an account ?</Link>
          </p>

          <button
            className="font-semibold flex items-center justify-center gap-4 border p-1 rounded-md md:w-8/12 mx-auto"
            onClick={handlegoogleLogin}
          >
            <FcGoogle /> Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
