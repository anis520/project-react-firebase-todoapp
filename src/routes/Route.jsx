import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../page/Home";
import Todo from "../page/Todo";
import Group from "../page/Group";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/todo", element: <Todo /> },
      { path: "/community", element: <Group /> },
    ],
  },
]);
