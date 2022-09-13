import React, { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../header/Header.css";
import { NavLink } from "react-router-dom";
import authService from "../../services/auth.service";
import { UserContext } from "../../layout/DashboardLayout";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SecureHeader = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const logoutNow = () =>{
    authService.logout();
    navigate('/')
  }

  const { dashboardContext, setDashboardContext } = useContext(UserContext);


  const handleToggleSidebar = () => {
    setDashboardContext({ showSidebar: !dashboardContext.showSidebar } as any);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>
                <i className="bi bi-list link" onClick={handleToggleSidebar}></i>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                </Nav>
                <div className="d-flex">
                {
              authService.isLoggedIn() ?
                <Button variant="primary" onClick={authService.logout}>
                  সাইন আউট <i className="bi bi-box-arrow-in-right"></i>
                </Button>
                :
                <Button variant="primary" onClick={goToLoginPage}>
                  লগইন <i className="bi bi-box-arrow-in-right"></i>
                </Button>
            }
                </div>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SecureHeader;
