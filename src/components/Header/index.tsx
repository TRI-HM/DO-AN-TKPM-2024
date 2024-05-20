import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

// Add your logo image (if needed)

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Your App Name</Navbar.Brand>
        {/* Add logo if desired */}
        {/* <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: User Name
                    </Navbar.Text>
                </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
