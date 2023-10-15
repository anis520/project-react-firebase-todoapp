import { RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { router } from "./routes/Route";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>;
    </>
  );
}

export default App;
