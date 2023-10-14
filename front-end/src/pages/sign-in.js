import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signin() {
    return (
        <Container className="vh-100">
            <Row className="h-100">
                <Col className="d-flex align-items-center">
                    <Form className="w-100">
                        <h1 className="text-green-300 text-center">Food ResQ</h1>
                        <Form.Group>
                            <Form.Control size="md" placeholder="Username" className="position-relative mb-3" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sign-in-password">
                            <Form.Control type="password" size="md" placeholder="Password" className="position-relative" />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="dark" size="lg">Sign in</Button>
                        </div>
                    </Form>
                </Col>
                <Col>
                    MEssage
                </Col>
            </Row>


        </Container>

    );
}

export default Signin;