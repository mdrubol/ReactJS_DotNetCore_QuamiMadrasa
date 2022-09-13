import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
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


const SecureHeader = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    authService.logout();
    navigate("/");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const { dashboardContext, setDashboardContext } = useContext(UserContext);


  const handleToggleSidebar = () => {

    console.log('now',dashboardContext.showSidebar,'seting to ',!dashboardContext.showSidebar);
    setDashboardContext({showSidebar:!dashboardContext.showSidebar} as any);

  };

  return (
    <>
{/*       <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
 */}
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <i className="bi bi-list link" onClick={handleToggleSidebar}></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                নোটিশ বোর্ড
              </Nav.Link>
            </Nav>
            <div className="d-flex">
              <Button variant="primary" onClick={goToLoginPage}>
                সাইন আউট <i className="bi bi-box-arrow-in-right"></i>
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
    </>
  );
};

export default SecureHeader;
