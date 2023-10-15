import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { ImBin } from "react-icons/im";

function IngredientItem ({IID, ingredient, quantity, unit, expDate, deleteIngredient}) {
    return (
        <>
            <Row className="ingredients-item w-75 fs-4 p-3 mx-auto text-black my-3 rounded-3 shadow-sm">
                <Col className="text-center">{ingredient}</Col>
                <Col className="text-center">{quantity}</Col>
                <Col className="text-center">{unit}</Col>
                <Col className="text-center">{expDate}</Col>
                <Col className="text-center"><a onClick={() => deleteIngredient(IID)}>{ImBin()}</a></Col>
            </Row>
        </>
    );
}

export default IngredientItem;