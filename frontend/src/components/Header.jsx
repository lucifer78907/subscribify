import appLogo from "../assets/Icon.svg";
import "./Header.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import uiContext from "../context/ui-context";
import { useContext } from "react";

const Header = () => {
  const { themeColor, setThemeColor } = useContext(uiContext);

  const handleThemeChange = () => {
    if (themeColor === "light") {
      setThemeColor("dark");
    } else setThemeColor("light");
  };

  return (
    <header className="header">
      <img src={appLogo} alt=" logo" className="app__icon" />
      <aside>
        <p className="theme__toggle" onClick={handleThemeChange}>
          <span>
            {themeColor === "light" && (
              <BsSunFill size="2.4rem" color="#fafafa" />
            )}
            {themeColor === "dark" && (
              <BsMoonFill size="2.4rem" color="#fafafa" />
            )}
          </span>
        </p>
      </aside>
    </header>
  );
};

export default Header;
