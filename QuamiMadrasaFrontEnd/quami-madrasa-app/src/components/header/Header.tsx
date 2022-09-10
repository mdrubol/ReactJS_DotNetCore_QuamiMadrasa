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
        <Navbar.Brand>কওমি মাদ্রাসা</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
            <i className="bi bi-house"></i> 
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
            আমাদের সম্পর্কে
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
            কার্যক্রম
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
            প্রতিবেদন
            </Nav.Link>
            <NavDropdown title="ফর্ম সমূহ" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/SS">
              ভর্তি ফরম
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/SSS">
              পুনঃ ভর্তি ফরম
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/SSSS">
              একটা ফরম
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/contact">
            নোটিশ বোর্ড
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
            রেজাল্ট আর্কাইভ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
            যোগাযোগ
            </Nav.Link>

          </Nav>
          <div className="d-flex">
            <Button variant="primary" onClick={goToLoginPage}>
             লগইন <i className="bi bi-box-arrow-in-right"></i>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
