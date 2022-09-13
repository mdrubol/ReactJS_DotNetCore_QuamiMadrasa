import React from "react";
import { Outlet } from "react-router-dom";
import SecureHeader from "../components/secure-header/SecureHeader";
import Footer from "../components/footer/Footer";
import { useState, useContext } from "react"
import Stack from 'react-bootstrap/Stack';

export const UserContext = React.createContext({} as any); //Initialise

const DashboardLayout = () => {
  const [dashboardContext, setDashboardContext] = useState({ showSidebar: false });
  const value = { dashboardContext, setDashboardContext }

  return (
    <>

      <UserContext.Provider value={value}>
        <Stack gap={0}>
          <SecureHeader />
          <Outlet />
          <Footer />
        </Stack>
      </UserContext.Provider>

    </>
  );
};

export default DashboardLayout;
