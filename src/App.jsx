import { RouterProvider, redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Login from "./page/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import router from "./routes/Route";
import { useDispatch, useSelector } from "react-redux";
import { setlogin, setlogout } from "./features/Auth/authSlice";
function App() {
  const { mode } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setlogin(user.email));
      } else {
        dispatch(setlogout());
      }
    });
  }, []);

  return (
    <div className={`${mode}  `}>
      <RouterProvider router={router}></RouterProvider>;
    </div>
  );
}

export default App;
