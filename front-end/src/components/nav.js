import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
    return (
        <Navbar bg="light" data-bs-theme="light" className="shadow-lg">
            <Container>
                <Navbar.Brand href="/">Food ResQ</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/">My Fridge</Nav.Link>
                    <Nav.Link href="/recipes">Recipes</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default ColorSchemesExample;