import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
