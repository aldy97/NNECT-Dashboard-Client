import React from "react";
// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://www.creative-tim.com/?ref=bdr-user-archive-footer">
              NNECT
            </NavLink>
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
