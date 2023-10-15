import React from "react";
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

function Recipes() {
    const [preference, setPreference] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const returnJSONObject = {
        "ingredients": {
            "Asian Dish": {
                "Pork Ribs": [200, "g"],
                "Onion": [1, "large"],
                "Carrot": [1, "medium"],
                "Potato": [2, "medium"],
                "Spring Onion": [2, "pieces"],
                "Rice": [1, "cup (uncooked)"]
            },
            "European Dish": {
                "Pork Ribs": [400, "g"],
                "Potato": [4, "medium"],
                "Onion": [1, "large"],
                "Celery": [1, "whole"],
                "Heavy Cream": [1, "cup"]
            },
            "Rice Dish": {
                "Hot Dog": [4, "pieces"],
                "Onion": [1, "large"],
                "Carrot": [1, "medium"],
                "Spring Onion": [2, "pieces"],
                "Rice": [1, "cup (cooked)"]
            }
        },
        "instructions": {
            "Asian Dish": [
                "Start by cooking the rice according to the package instructions.",
                "Cut the pork ribs into small pieces and marinate them with soy sauce, salt, and pepper for 15 minutes.",
                "Heat a pan with cooking oil and stir-fry the marinated pork ribs until they're cooked through. Set aside.",
                "In the same pan, add more oil if needed and sauté the sliced onion, carrot, and potato until they start to soften.",
                "Add sliced spring onions and stir-fry for a few more minutes.",
                "Return the cooked pork ribs to the pan and mix everything together.",
                "Adjust the seasoning with soy sauce, salt, and pepper to taste.",
                "Serve the stir-fry over the cooked rice.",
                "Preparation and cooking time: Approximately 40 minutes."
            ],
            "European Dish": [
                "Preheat your oven to 350°F (175°C).",
                "Cut the pork ribs into smaller pieces and season with salt and pepper.",
                "In a large ovenproof dish, add a drizzle of olive oil and sear the pork ribs until browned. Remove and set aside.",
                "In the same dish, add more olive oil if needed and sauté the sliced onion, celery, and potato until they start to soften.",
                "Return the cooked pork ribs to the pan.",
                "Pour heavy cream over the ingredients until they are partially covered.",
                "Cover the dish with aluminum foil and bake in the preheated oven for 1 hour.",
                "Remove the foil and bake for an additional 30 minutes or until the potatoes are tender and the top is golden.",
                "Serve the creamy potato and pork casserole hot.",
                "Preparation and cooking time: Approximately 1 hour 30 minutes."
            ],
            "Rice Dish": [
                "Heat a pan with cooking oil and sauté the sliced hot dogs until they start to brown.",
                "Add sliced onion and carrot to the pan and sauté until they start to soften.",
                "Add the cooked rice and stir-fry until well combined.",
                "Add sliced spring onions and stir-fry for a few more minutes.",
                "Season with soy sauce, salt, and pepper to taste.",
                "Serve the hot dog and vegetable fried rice hot.",
                "Preparation and cooking time: Approximately 25 minutes."
            ]
        }
    };

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
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} preference={preference} setPreference={setPreference}/>
                                <IngredientFormItem ingredient={"Onion"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} preference={preference} setPreference={setPreference}/>
                                <IngredientFormItem ingredient={"Potato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} preference={preference} setPreference={setPreference}/>
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                                <IngredientFormItem ingredient={"Tomato"} quantity={5} unit={"Kg"} expDate={"07/05/2023"} />
                            </Col>
                        </Row>
                        <Row className="mt-3 recipe-width mx-auto">
                            <h2 className="text-black text-center">Customization</h2>
                            <Col className="p-0">
                                <Form.Control className="customization" as="textarea" placeholder="Enter your customization..." rows={4}/>
                            </Col>
                        </Row>

                        <Row className="mt-4 recipe-width mx-auto">
                            <Button variant="success" onClick={() => parseRecipes(returnJSONObject)}>
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