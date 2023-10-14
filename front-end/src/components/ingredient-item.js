import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function IngredientItem ({ingredient, quantity, unit, expDate}) {
    return (
        <>
            <Row className="ingredients-item w-75 fs-4 p-3 mx-auto text-black my-3 rounded-3 shadow-sm">
                <Col className="text-center">{ingredient}</Col>
                <Col className="text-center">{quantity}</Col>
                <Col className="text-center">{unit}</Col>
                <Col className="text-center">{expDate}</Col>
                <Col className="text-center">0</Col>
            </Row>
        </>
    );
}

export default IngredientItem;