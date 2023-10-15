import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';

function IngredientFormItem ({ingredient, quantity, unit, expDate, setPreference, preference}) {
    const handleChange = (event) => {
        // console.log(event.target.checked);
        const copyPreference = [...preference];
        if (event.target.checked) {
            setPreference([...copyPreference, ingredient]);
        } else {
            const index = copyPreference.indexOf(ingredient);
            console.log(index);
            if (index > -1) {
                setPreference([...copyPreference.slice(0, index),
                    ...copyPreference.slice(index + 1)]);
            }
        }
    }

    return (
        <>
            <Row className="ingredients-item recipe-width fs-4 p-3 mx-auto text-black my-3 rounded-3 shadow-sm">
                <Col className="text-center">{ingredient}</Col>
                <Col className="text-center">{quantity}</Col>
                <Col className="text-center">{unit}</Col>
                <Col className="text-center">{expDate}</Col>
                <Col className="text-center">
                    <Form.Check aria-label="option 1" onChange={handleChange}></Form.Check>
                </Col>
            </Row>
        </>
    );
}

export default IngredientFormItem;