import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [],
  },
]);
export default router;
