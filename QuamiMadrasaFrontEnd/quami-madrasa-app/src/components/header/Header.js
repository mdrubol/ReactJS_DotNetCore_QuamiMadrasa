import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "../header/Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Qawmi Madrasa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
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
            <Button variant="secondary" onClick={goToLoginPage}>
              Login <i className="bi bi-box-arrow-in-right"></i>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
