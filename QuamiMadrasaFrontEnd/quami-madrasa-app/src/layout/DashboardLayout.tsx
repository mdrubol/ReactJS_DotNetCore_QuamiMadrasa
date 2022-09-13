import React from "react";
import { Outlet } from "react-router-dom";
import SecureHeader from "../components/secure-header/SecureHeader";
import Footer from "../components/footer/Footer";
import { useState, useContext } from "react"

export const UserContext = React.createContext({} as any); //Initialise

const DashboardLayout = () => {
  const [dashboardContext, setDashboardContext] = useState({showSidebar:false});
  const value = {dashboardContext, setDashboardContext}

  return (
    <>
    <UserContext.Provider value={value}>
      <SecureHeader />
      <Outlet />
      <Footer />
      </UserContext.Provider>
    </>
  );
};

export default DashboardLayout;
