import { useState, createContext } from "react";

// create a context
const uiContext = createContext({
  themeColor: "light",
  setThemeColor: () => {},
});

export const UIContextProvider = ({ children }) => {
  const [currTheme, setCurrentTheme] = useState("light");
  return (
    <uiContext.Provider
      value={{
        themeColor: currTheme,
        setThemeColor: setCurrentTheme,
      }}
    >
      {children}
    </uiContext.Provider>
  );
};

export default uiContext;
