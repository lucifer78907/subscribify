import Input from "./Input";
import "./Form.scss";
import { useFetcher, useNavigate, Link } from "react-router-dom";
import { json } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ isLogin }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const checkRef = useRef();

  useEffect(() => {
    if (fetcher?.data?.status === 201) {
      toast.success("User account created", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/login"),
      });
    } else if (fetcher?.data?.status === 200) {
      if (fetcher.data.hasAnyActivePlan) {
        toast.success("Successfully logged in", {
          position: toast.POSITION.TOP_RIGHT,
          onClose: () => navigate(`/activePlan/${fetcher.data.userId}`),
        });
      } else {
        toast.success("Successfully logged in", {
          position: toast.POSITION.TOP_RIGHT,
          onClose: () => navigate(`/plans/${fetcher.data.userId}`),
        });
      }
    } else if (fetcher?.data?.status === 401) {
      // wrong credentials
      toast.error("Wrong Password!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (fetcher?.data?.status === 404) {
      // user doesn't exist
      toast.error("User doesn't exists! Signup instead", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/signup"),
      });
    } else if (fetcher?.data?.status === 409) {
      //duplicate record
      toast.error(`${fetcher.data.message}! Login instead`, {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/login"),
      });
    } else if (fetcher?.data?.status === 422) {
      // server validation errors
      fetcher.data?.data.map((error) => {
        toast.warning(error.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
  }, [fetcher?.data]);

  const handleFormLogin = () => {
    navigate("/login");
  };

  const handleFormSignUp = () => {
    navigate("/signup");
  };

  const handleChange = () => {
    setIsChecked(checkRef.current.checked);
  };

  return (
    <article className="form__container">
      <ToastContainer style={{ fontSize: "1.7rem", width: "max-content" }} />
      <h2 className="heading__secondary">
        {isLogin ? "Login" : "Create Account"}
      </h2>
      <fetcher.Form
        method="POST"
        action={`${isLogin ? "/login" : "/signup"}`}
        className="form"
      >
        {!isLogin && (
          <Input
            label="Name"
            id="username"
            type="text"
            name="username"
            defaultValue="Rudra Pratap Singh"
          />
        )}
        <Input
          label="Email address"
          id="email"
          type="email"
          name="email"
          defaultValue="singh123@gmail.com"
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          defaultValue="mySuperSecretp@$$Word"
        />
        {isLogin && (
          <label className="checkbox__label" htmlFor="check">
            Remember me
            <input ref={checkRef} type="checkbox" id="check" hidden />
            <span
              onClick={handleChange}
              className={`checkbox__box ${
                isChecked ? "checkbox__box--green" : ""
              }`}
            ></span>
          </label>
        )}
        <button className="form__button">{`${
          isLogin ? "Login" : "Signup"
        }`}</button>
        {isLogin === false && (
          <p className="form__para">
            Already have an account?
            <span onClick={handleFormLogin}>Login</span>
          </p>
        )}
        {isLogin === true && (
          <p className="form__para">
            New to subscribify?
            <span onClick={handleFormSignUp}>Sign Up</span>
          </p>
        )}
      </fetcher.Form>
    </article>
  );
};

export default Form;

export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (
    response.status === 404 ||
    response.status === 401 ||
    response.status === 422
  ) {
    //user doesn't exists
    return response;
  }

  if (!response.ok) throw json({ message: "Could not login" });

  return response;
};

export const signUpAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (response.status === 409 || response.status === 422) return response;

  if (!response.ok) throw json({ message: "Could not create a user" });

  return response;
};
