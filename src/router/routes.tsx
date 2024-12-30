import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default routes;
