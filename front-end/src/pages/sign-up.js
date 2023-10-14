import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function TwoColumnPage() {
    return (
        <Container fluid>
            <Row>
                <Col md={6} lg={6}>
                    {/* Content for the first column */}
                    <h2>Column 1</h2>
                    <p>This is the content for the first column.</p>
                </Col>
                <Col md={6} lg={6}>
                    {/* Content for the second column */}
                    <h2>Column 2</h2>
                    <p>This is the content for the second column.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default TwoColumnPage;
