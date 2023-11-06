import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";

const PublicGard = () => {
  const [user, setuser] = useState(localStorage.getItem("user"));

  //   return <Outlet />;
  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default PublicGard;
