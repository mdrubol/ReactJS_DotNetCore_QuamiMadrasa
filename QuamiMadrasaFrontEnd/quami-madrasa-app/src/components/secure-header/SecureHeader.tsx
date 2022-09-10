import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../header/Header.css";
import { NavLink } from "react-router-dom";

const SecureHeader = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <i className="bi bi-list link" onClick={handleShow}></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/data">
                Data
              </Nav.Link>
              <Nav.Link as={NavLink} to="/table">
                Table
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/SS">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/SSS">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/SSSS">
                  Something
                </NavDropdown.Item>
              </NavDropdown>
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
