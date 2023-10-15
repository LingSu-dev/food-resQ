import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";

function ColorSchemesExample() {
    const logout = () => {
        const api_domain = process.env.BACKEND_API_DOMAIN
            ? process.env.BACKEND_API_DOMAIN
            : "localhost";
        const api_url = "http://" + api_domain + ":5000";
        console.log(api_url);
        const axiosWithCookies = axios.create({
            withCredentials: true,
        });

        axiosWithCookies.get(api_url + "/logout")
            .then(function (response) {
                // handle success
                console.log(response);
                localStorage.removeItem("user");
                window.location.href = "/signin";
            })
            .catch(function (error) {
                // handle error
                console.log(error.response.data.error);
            });
    }
    return (
        <Navbar bg="light" data-bs-theme="light" className="shadow-lg">
            <Container>
                <Navbar.Brand href="/">Food ResQ</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/">My Fridge</Nav.Link>
                    <Nav.Link href="/recipes">Recipes</Nav.Link>
                    {localStorage.getItem("user") ?
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                        : <></>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default ColorSchemesExample;