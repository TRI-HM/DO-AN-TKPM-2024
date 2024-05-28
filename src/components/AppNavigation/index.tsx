import React from "react";
import { NavItem, Nav } from "react-bootstrap";

interface AppNavigationProps {}

const AppNavigation: React.FC<AppNavigationProps> = () => {
  return (
    <Nav className="flex flex-column">
      <NavItem>
        <Nav.Link href="/">Home</Nav.Link>
      </NavItem>
      <NavItem>
        <Nav.Link href="/login">login</Nav.Link>
      </NavItem>
      <NavItem>
        <Nav.Link href="/app-chat">App Chat</Nav.Link>
      </NavItem>
    </Nav>
  );
};

export default AppNavigation;
