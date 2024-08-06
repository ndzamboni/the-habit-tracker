import React from 'react';
import { Container, Row, Col, Button, Card, Accordion, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Container>
        <Row className="hero-section">
          <Col md={6}>
            <h1>Track Your Habits</h1>
            <p>Build and maintain good habits with our easy-to-use habit tracker. Visualize your progress and stay motivated.</p>
            <Button variant="primary" as={Link} to="/register">Get Started</Button>
          </Col>
          <Col md={6}>
            <img src="/images/hero-image.png" alt="Hero" className="img-fluid" />
          </Col>
        </Row>

        <Row className="features-section">
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Habit Tracking</Card.Title>
                <Card.Text>Track your habits and visualize your progress over time.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Data Visualization</Card.Title>
                <Card.Text>View various charts to analyze your habits and performance.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Reminders</Card.Title>
                <Card.Text>Set reminders to stay on top of your habits.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="testimonials-section">
          <Col md={4}>
            <Card className="testimonial-card">
              <Card.Body>
                <Card.Text>"This habit tracker has changed my life! It's so easy to use and keeps me motivated."</Card.Text>
                <Card.Footer>- John Doe</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="testimonial-card">
              <Card.Body>
                <Card.Text>"I love the data visualization features. It's great to see my progress over time."</Card.Text>
                <Card.Footer>- Jane Smith</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="testimonial-card">
              <Card.Body>
                <Card.Text>"The reminders keep me on track with my habits. Highly recommend this app!"</Card.Text>
                <Card.Footer>- Michael Brown</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="demo-section">
          <Col>
            <h2>App Screenshots</h2>
            <Carousel>
              <Carousel.Item>
                <img src="/images/screenshot1.png" alt="Screenshot 1" className="d-block w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="/images/screenshot2.png" alt="Screenshot 2" className="d-block w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="/images/screenshot3.png" alt="Screenshot 3" className="d-block w-100" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>

        <Row className="about-section">
          <Col>
            <h2>About Us</h2>
            <p>We are a passionate team dedicated to helping you build better habits. Our mission is to provide an easy-to-use and effective tool to help you track and maintain your habits. With our app, you can visualize your progress, set reminders, and stay motivated on your journey to self-improvement.</p>
          </Col>
        </Row>

        <Row className="faq-section">
          <Col>
            <h2>Frequently Asked Questions</h2>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>How do I create an account?</Accordion.Header>
                <Accordion.Body>
                  To create an account, click on the "Register" button at the top of the page and fill in your details. Once you submit the form, you will be able to log in and start using the app.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How do I track my habits?</Accordion.Header>
                <Accordion.Body>
                  After logging in, go to the Dashboard and click on "Add Habit". Fill in the details of your habit and save it. You can then log your progress daily.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Can I set reminders for my habits?</Accordion.Header>
                <Accordion.Body>
                  Yes, you can set reminders for your habits in the app. This will help you stay on track and ensure you don't forget to log your progress.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Is my data secure?</Accordion.Header>
                <Accordion.Body>
                  We take data security seriously. All your data is encrypted and stored securely. We do not share your data with any third parties.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <Row className="signup-section">
          <Col>
            <h2>Join Us Today</h2>
            <p>Start building better habits now. Sign up for free and get started on your journey to self-improvement.</p>
            <Button variant="success" as={Link} to="/register">Sign Up</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
