import React from "react";
// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.nnect.ca/">NNECT</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="mailto:support@nnect.ca">Contact Us</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </footer>
  );
}

export default Footer;
