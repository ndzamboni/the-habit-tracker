import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { Navbar, Nav, Container, Button, Modal, Form } from 'react-bootstrap';
import './Navbar.css';

function AppNavbar({ toggleDarkMode }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [featureRequest, setFeatureRequest] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleFeatureRequestChange = (e) => setFeatureRequest(e.target.value);
  const handleFeatureRequestSubmit = () => {
    console.log('Feature Request Submitted:', featureRequest);
    setFeatureRequest('');
    handleClose();
  };

  return (
    <>
      <Navbar className={user?.darkMode ? 'navbar-dark' : 'navbar-light'} expand="lg">
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
              <Nav.Link onClick={handleShow}>Feature Requests</Nav.Link>
            </Nav>
            <Button variant="outline-secondary" onClick={toggleDarkMode}>Toggle Dark Mode</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} className={user?.darkMode ? 'dark-mode' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Feature Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="featureRequest">
              <Form.Label>Your Feature Request</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={featureRequest}
                onChange={handleFeatureRequestChange}
                placeholder="Describe the feature you would like to see"
                className="feature-request-textarea"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleFeatureRequestSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppNavbar;
