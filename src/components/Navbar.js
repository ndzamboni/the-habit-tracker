import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';

function AppNavbar({ toggleDarkMode, darkMode }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Habit Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
            <Button variant="outline-secondary" onClick={toggleDarkMode}>Toggle Dark Mode</Button>
            {user && (
              <Button variant="primary" className="ms-2" onClick={handleSidebarShow}>
                Customize
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Sidebar show={showSidebar} handleClose={handleSidebarClose} darkMode={darkMode} />
    </>
  );
}

export default AppNavbar;
