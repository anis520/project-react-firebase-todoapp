import PublicGard from "./PublicGard";
import Login from "../page/Login";
import Register from "../page/Register";

// creat public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
];

// export router
export default publicRouter;
