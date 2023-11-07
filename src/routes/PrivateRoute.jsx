import PrivateGard from "./PrivateGard";
import Layout from "../components/layout";
import Home from "../page/Home";
import Todo from "../page/Todo";
import Group from "../page/Group";
import Account from "../page/Account";

const privateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "*", element: <Home /> },
          { path: "/", element: <Home /> },
          { path: "/todo", element: <Todo /> },
          { path: "/community", element: <Group /> },
          { path: "/account", element: <Account /> },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
