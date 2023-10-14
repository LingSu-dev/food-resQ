import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./sign-in.css";

function Signin() {
  return (
    <Container>
      <Row>
        <Col>
          <Form id="sign-in-form">
            <h1 className="text-green-300">Food ResQ</h1>
            <Form.Group controlId="sign-in-email-address">
              <Form.Control
                type="email"
                size="lg"
                placeholder="Email address"
                autoComplete="username"
                className="position-relative"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sign-in-password">
              <Form.Control
                type="password"
                size="lg"
                placeholder="Password"
                autoComplete="current-password"
                className="position-relative"
              />
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-center mb-4"
              controlId="remember-me"
            >
              <Form.Check label="Remember me" />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" size="lg">
                Sign in
              </Button>
            </div>
            <p className="mt-5 text-muted">&copy; 2021-2022</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signin;
