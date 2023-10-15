import {Accordion} from "react-bootstrap";
import React from "react";

function RecipeItem({eventKey, recipe}) {
    return (
        <>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{recipe["name"]}</Accordion.Header>
                <Accordion.Body>
                    <h4>Ingredients</h4>
                    {recipe["ingredients"]}
                    <h4>Steps</h4>
                    <ol>
                        {recipe["instructions"].map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}

export default RecipeItem;