import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './sign-in.css';
import Navbar from "../components/nav";

function Signin() {
    return (
        <>
            <Navbar />
            <div className="signin">
                <Container className="vh-100">
                    <Row className="h-100 w-100 align-items-center">
                        <Col className="h-100 d-flex align-items-center foodbg">
                            <Form className="w-75">
                                <h1 className="text-black text-center">Food ResQ</h1>
                                <Form.Group>
                                    <Form.Control size="md" placeholder="Username" className="position-relative mb-3" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="sign-in-password">
                                    <Form.Control type="password" size="md" placeholder="Password" className="position-relative" />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="dark" size="md">Sign in</Button>
                                </div>
                            </Form>
                        </Col>
                        <Col>
                            <div className="flex-column justify-content-center">
                                <h4>Worried about your ingredients going bad?</h4>
                                <h5 className="mt-3">Try our recipes catered towards what ingredients you have right now.</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Signin;