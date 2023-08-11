import { useNavigate } from "react-router";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="home">
      <h1 className="heading__primary">
        Welcome to <span>SubsCribify</span>
      </h1>
      <h2 className="heading__secondary heading__secondary--home">
        Login/Signup to discover our plans!
      </h2>
      <button onClick={() => navigate("/login")} className="home__button">
        Login
      </button>
      <button onClick={() => navigate("/signup")} className="home__button">
        Signup
      </button>
    </section>
  );
};

export default Home;
