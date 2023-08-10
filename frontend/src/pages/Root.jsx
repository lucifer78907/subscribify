import { Outlet } from "react-router";
import Header from "../components/Header";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
