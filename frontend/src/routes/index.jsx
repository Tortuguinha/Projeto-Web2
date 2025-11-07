
import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
	  path: "*",
    element: <NotFoundPage />
  }
]);

export default router;
