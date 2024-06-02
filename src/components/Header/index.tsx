import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

// Add your logo image (if needed)

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Navbar className="wrappHeader">
      <Container className="header">
        <Navbar.Brand href="/">Your App Name</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
