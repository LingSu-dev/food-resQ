import React, {useEffect} from "react";
import { useState } from 'react';
import Navbar from "../components/nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './home.css';
import Form from 'react-bootstrap/Form';
import IngredientFormItem from "../components/ingredient-form-item";
import Button from "react-bootstrap/Button";
import {Accordion} from "react-bootstrap";
import RecipeItem from "../components/recipe-item";
import axios from "axios";

function Recipes() {
    const [preference, setPreference] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [customization, setCustomization] = useState("");

    const [ingredients, setIngredients] = useState([]);
    console.log(preference.toString());
    const parseRecipes = (recipes) => {
        let recipesArr = [];

        for (const [key, value] of Object.entries(recipes["ingredients"])) {
            const dishName = key;
            let ingredients = "";

            for (const [ingredient, qtyUnit] of Object.entries(value)) {
                let ingredientStr = ingredient + ": " + qtyUnit[0] + " " + qtyUnit[1];
                ingredients += ingredientStr + ", ";
            }

            const dishObject = {"name": dishName, "ingredients": ingredients.substring(0, ingredients.length - 2), "instructions": recipes["instructions"][dishName]};
            recipesArr.push(dishObject);
        }

        setRecipes(recipesArr);
    }

    const getRecipes = () => {
        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.post(api_url + "/LLM/getRecipes", {
            "preference": preference.toString(),
            "customization": customization
        })
            .then(function (response) {
                // handle success
                console.log(response.data);
                parseRecipes(response.data);
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
            <Container fluid className="home vh-calc pt-4 overflow-y-hidden">
                <Row className="w-100 mx-auto">
                    <Col>
                        <Row className="mt-3">
                            <h2 className="text-black text-center">Select Essential Ingredients</h2>
                        </Row>
                        <Row>
                            <Col className="ingredients-view overflow-y-scroll">
                                <Row className="ingredients-header mt-3 recipe-width fs-4 p-3 rounded-top-3 mx-auto text-white fw-bold">
                                    <Col className="text-center">Name</Col>
                                    <Col className="text-center">Qty</Col>
                                    <Col className="text-center">Unit</Col>
                                    <Col className="text-center">Exp</Col>
                                    <Col className="text-center">Use?</Col>
                                </Row>
                                {ingredients.map((ingredient, i) => (
                                    <IngredientFormItem key={i}
                                                    ingredient={ingredient.name}
                                                    quantity={ingredient.amount}
                                                    unit={ingredient.unit}
                                                    expDate={ingredient.expiry_date}
                                                    IID={ingredient._id}
                                                    preference={preference}
                                                    setPreference={setPreference}
                                    />
                                ))}
                            </Col>
                        </Row>
                        <Row className="mt-3 recipe-width mx-auto">
                            <h2 className="text-black text-center">Customization</h2>
                            <Col className="p-0">
                                <Form.Control className="customization"
                                              as="textarea"
                                              placeholder="Enter your customization..."
                                              rows={4}
                                              onChange={(e) => setCustomization(e.target.value)}/>
                            </Col>
                        </Row>

                        <Row className="mt-4 recipe-width mx-auto">
                            <Button variant="success" onClick={getRecipes}>
                                Generate Recipes
                            </Button>
                        </Row>

                    </Col>
                    <Col className="recipe-generate-area rounded overflow-y-scroll">
                        <Row className="mt-3">
                            <h2 className="text-black text-center">Recipes</h2>
                        </Row>
                        <Row className="mt-3 mb-3 recipe-width mx-auto">
                            {recipes.length === 0 ? <h5 className="text-black text-center">No recipes generated yet.</h5>
                                :
                                <Accordion defaultActiveKey="0">
                                    <RecipeItem eventKey={0} recipe={recipes[0]}/>
                                    <RecipeItem eventKey={1} recipe={recipes[1]}/>
                                    <RecipeItem eventKey={2} recipe={recipes[2]}/>
                                </Accordion>}
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Recipes;