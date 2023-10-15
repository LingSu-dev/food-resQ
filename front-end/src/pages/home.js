import React from "react";
import { useState } from 'react';
import Navbar from "../components/nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './home.css';
import IngredientItem from "../components/ingredient-item";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Home() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar />
            <Container fluid className="home vh-calc pt-4 overflow-auto">
                <Row>
                    <h1 className="text-black text-center">[]'s Fridge</h1>
                </Row>

                <Row>
                    <Col className="ingredients-view overflow-y-scroll">
                        <Row className="ingredients-header mt-3 w-75 fs-4 p-3 rounded-top-3 mx-auto text-white fw-bold">
                            <Col className="text-center">Ingredient</Col>
                            <Col className="text-center">Quantity</Col>
                            <Col className="text-center">Unit</Col>
                            <Col className="text-center">Exp. Date</Col>
                            <Col className="text-center"></Col>
                        </Row>
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />                    <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                        <IngredientItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                    </Col>
                </Row>
                <Row className="justify-content-center w-50 mx-auto mt-4">
                    <Col auto className="text-center">
                        <Button size="lg" variant="success" onClick={handleShow}><strong>Add Ingredients</strong></Button>
                    </Col>
                    <Col className="text-center">
                        <Button size="lg" variant="warning"><strong>Delete All</strong></Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add an ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="ingredient">
                            <Form.Label>Ingredient Name</Form.Label>
                            <Form.Control
                                placeholder="ex. tomato"
                                autoFocus
                            />
                        </Form.Group>
                        <div className="d-flex gap-4">
                            <Form.Group
                                className="mb-3"
                                controlId="quantity"
                            >
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    placeholder="ex. 3"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="quantity"
                            >
                                <Form.Label>Unit</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Select unit</option>
                                    <option value="lbs">lbs</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="g">peices</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;