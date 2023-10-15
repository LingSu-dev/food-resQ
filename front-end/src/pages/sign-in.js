import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './auth.css';
import Navbar from "../components/nav";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Signin() {
    const [variables, setVariables] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState("");

    function submitSigninForm(e) {
        e.preventDefault();

        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies
            .post(api_url + "/login", {
                username: variables.username,
                password: variables.password,
            })
            .then(function (response) {
                // handle success
                console.log(response);
                console.log(response.headers);
                localStorage.setItem("user", variables.username);
                window.location.href = "/";
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                if (error.response) {
                    if (error.response.status === 401) {
                        setErrors(error.response.data.error);
                    } else {
                        setErrors("Error from backend: " + error.response.status);
                    }
                } else if (error.request) {
                    setErrors("No response");
                } else {
                    setErrors("Error when setting up the request");
                }
            });
    }
    return (
        <>
            <Navbar />
            <div className="signin">
                <Container className="vh-calc">
                    <Row className="h-100 w-100 align-items-center">
                        <Col className="h-100 d-flex align-items-center foodbg">
                            <Form className="w-75" onSubmit={submitSigninForm}>
                                <h1 className="text-black text-center mb-4">Food ResQ</h1>
                                <Form.Group>
                                    <Form.Label className={errors && "text-danger"}>
                                        {errors || ""}
                                    </Form.Label>
                                    <Form.Control size="md"
                                                  placeholder="Username"
                                                  className="position-relative mb-3"
                                                  value={variables.username}
                                                  onChange={(e) =>
                                                      setVariables({
                                                          ...variables,
                                                          username: e.target.value,
                                                      })
                                                  }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="sign-in-password">
                                    <Form.Control type="password"
                                                  size="md"
                                                  placeholder="Password"
                                                  className="position-relative"
                                                  value={variables.password}
                                                  onChange={(e) =>
                                                      setVariables({
                                                          ...variables,
                                                          password: e.target.value,
                                                      })
                                                  }/>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="dark" size="md" type="submit">Sign in</Button>
                                </div>
                                <div className="text-center fs-5 mt-3">
                                    <Form.Text className="text-black">
                                        Don't have an account? &nbsp;
                                        <Link to={"/signup"} className="text-black">Sign up</Link>
                                    </Form.Text>
                                </div>
                            </Form>
                        </Col>
                        <Col>
                            <div className="flex-column justify-content-center text-black">
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