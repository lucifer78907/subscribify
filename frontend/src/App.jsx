import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { loginAction, signUpAction } from "./components/Form";
import "./App.scss";
import uiContext from "./context/ui-context";
import { useContext, useEffect } from "react";

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
          action: signUpAction,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
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
