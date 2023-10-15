import React, {useEffect} from "react";
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
import axios from "axios";

function Home() {
    const [show, setShow] = useState(false);

    const [ingredients, setIngredients] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addIngredient = (event) => {
        event.preventDefault();
        console.log("Adding ingredient");
        const ingredient = event.target.elements.ingredient.value;
        const quantity = event.target.elements.quantity.value;
        const unit = event.target.elements.unit.value;
        const expDate = event.target.elements.expDate.value;

        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.post(api_url + "/ingredients", {
            name: ingredient,
            amount: quantity,
            unit: unit,
            expiry_date: expDate
        })
            .then(function (response) {
                // handle success
                console.log(response);
                const ingredientID = response.data._id;
                const ingredientObject = {
                    _id: ingredientID,
                    name: ingredient,
                    amount: quantity,
                    unit: unit,
                    expiry_date: expDate
                }
                setIngredients([...ingredients, ingredientObject]);
            })
            .catch(function (error) {
                // handle error
                console.log(error.response.data.error);
            });
        setShow(false);
    }
    const deleteIngredient = (IID) => {
        console.log("Deleting ingredient: " + IID);
        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.delete(api_url + "/ingredients/" + IID)
            .then(function (response) {
                // handle success
                console.log(response);
                setIngredients(ingredients.filter((ingredient) => ingredient._id !== IID));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const deleteAllIngredients = () => {
        console.log("Deleting all ingredients");
        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.delete(api_url + "/ingredients")
            .then(function (response) {
                // handle success
                console.log(response);
                setIngredients([]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    useEffect(() => {
        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.get(api_url + "/ingredients")
            .then(function (response) {
                // handle success
                setIngredients(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <Container fluid className="home vh-calc pt-4 overflow-auto">
                <Row>
                    <h1 className="text-black text-center">{localStorage.getItem("user")}'s Fridge</h1>
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
                        {ingredients.map((ingredient, i) => (
                            <IngredientItem key={i}
                                            IID={ingredient._id}
                                            ingredient={ingredient.name}
                                            quantity={ingredient.amount}
                                            unit={ingredient.unit}
                                            expDate={ingredient.expiry_date}
                                            deleteIngredient={deleteIngredient}/>))}
                    </Col>
                </Row>
                <Row className="justify-content-center w-50 mx-auto mt-4">
                    <Col auto className="text-center">
                        <Button size="lg" variant="success" onClick={handleShow}><strong>Add Ingredients</strong></Button>
                    </Col>
                    <Col className="text-center">
                        <Button size="lg" variant="warning" onClick={() => deleteAllIngredients()}><strong>Delete All</strong></Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add an ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addIngredient}>
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
                                controlId="unit"
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
                        <Form.Group controlId="expDate">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <div className="mt-3">
                            <Button variant="" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleClose} type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Home;