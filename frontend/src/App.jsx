import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { loginAction, signUpAction } from "./components/Form";
import { loader as plansLoader } from "./pages/Plans";
import "./App.scss";
import uiContext from "./context/ui-context";
import { useContext, useEffect } from "react";
import Plans from "./pages/Plans";
import Billing from "./pages/Billing";
import UserHome from "./pages/UserHome";
import { loader as planLoader } from "./components/CheckoutForm";

// #TODO Remember me in signup login
// #TODO Plans screen
const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
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
          path: "activePlan",
          element: <UserHome />,
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
