import React from "react";
import { Outlet } from "react-router-dom";
import SecureHeader from "../components/secure-header/SecureHeader";
import Footer from "../components/footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <SecureHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default DashboardLayout;
