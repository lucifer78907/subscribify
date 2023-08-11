import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loginAction, signUpAction } from "./components/Form";
import { loader as planLoader } from "./components/CheckoutForm";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Plans, { loader as plansLoader } from "./pages/Plans";
import UserHome, {
  loader as planDataLoader,
  action as deletePlanAction,
} from "./pages/UserHome";
import Billing from "./pages/Billing";
import { useContext, useEffect } from "react";
import uiContext from "./context/ui-context";
import "./App.scss";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
          action: signUpAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "plans/:userId",
          element: <Plans />,
          loader: plansLoader,
        },
        {
          path: "billing/:userId/:duration/:selectedPlan",
          element: <Billing />,
          loader: planLoader,
        },
        {
          path: "activePlan/:userId",
          element: <UserHome />,
          loader: planDataLoader,
          action: deletePlanAction,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (themeColor === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [themeColor]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
