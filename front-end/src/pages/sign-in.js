import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signin() {
    return (
        <Container >
            <Row className="justify-content-center">
                <Col className="vh-100 align-items-center">
                    <Form>
                        <h1 className="text-green-300">Food ResQ</h1>
                        <Form.Group>
                            <Form.Control size="md" placeholder="Username" className="position-relative mb-3" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sign-in-password">
                            <Form.Control type="password" size="md" placeholder="Password" className="position-relative" />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" size="lg">Sign in</Button>
                        </div>
                        <p className="mt-5 text-muted">&copy; 2021-2022</p>
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