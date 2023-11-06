import { Navigate, Outlet, redirect } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";

const PrivateGard = () => {
  const [user, setuser] = useState(localStorage.getItem("user"));
  console.log(user);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
  //   return <Outlet />;
};

export default PrivateGard;
