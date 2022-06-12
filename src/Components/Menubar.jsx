import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Popup from "./Popup";

const Menubar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            {" "}
            Perception
          </Navbar.Brand>
          <Nav className="me-auto">
            {localStorage.getItem("isLoggedIn") === "true" && (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => {
                  localStorage.clear();
                  // window.location.reload();
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
          <Popup />
        </Container>
      </Navbar>
      <br />
    </div>
  );
};

export default Menubar;
