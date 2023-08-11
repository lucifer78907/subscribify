import { useNavigate } from "react-router";
import "./Home.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="home">
      <h1 className="heading__primary">
        <span>404</span> Page Not Found!!
      </h1>
      <button onClick={() => navigate("/")} className="home__button">
        Back to home
      </button>
    </section>
  );
};

export default ErrorPage;
