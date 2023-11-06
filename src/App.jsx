import { RouterProvider, redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Login from "./page/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import router from "./routes/Route";
function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        localStorage.setItem("user", user.email);
        redirect("/");
      } else {
        localStorage.removeItem("user");
        redirect("/login");
      }
    });
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>;
    </>
  );
}

export default App;
