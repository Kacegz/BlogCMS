import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Edit from "./Edit";
import Delete from "./Delete";
import Create from "./Create";
import Read from "./Read";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { path: "/dashboard/:id", element: <Read /> },
      { path: "/dashboard/", index: true, element: <Create /> },
      { path: "/dashboard/:id/edit", element: <Edit /> },
      { path: "/dashboard/:id/delete", element: <Delete /> },
    ],
  },
]);
export default router;
