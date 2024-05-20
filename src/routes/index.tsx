import { BrowserRouter } from "react-router-dom";
import { Route, Outlet, Routes } from "react-router-dom";

import Login from "../components/Login";
import ChatGPTInterface from "../components/ChatUI";
import { Container, Row, Col, Nav, Navbar, NavItem } from "react-bootstrap";

// Import your header and chat components (created later)
import Header from "../components/Header"; // Adjust path as needed

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Container className="vh-100 px-0" fluid={true}>
              <Header />
              <Row>
                <Col sm={3} style={{ padding: 20 }}>
                  <Nav className="flex flex-column">
                    {/* Navigation links (created later) */}
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
                </Col>
                <Col sx={9} md={9}>
                  <Outlet />
                </Col>
              </Row>
            </Container>
          }
        >
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/login" Component={Login} />
          <Route path="/app-chat" Component={ChatGPTInterface} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; // Adjust path as needed
