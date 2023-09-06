import { createBrowserRouter } from "react-router-dom";
import Todos from "@pages/Todos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
  },
]);
