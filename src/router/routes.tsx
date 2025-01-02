import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart";
import Services from "../pages/Services";
import Discounts from "../pages/Discounts";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Cart />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/discounts",
        element: <Discounts />,
      },
    ],
  },
]);

export default routes;
