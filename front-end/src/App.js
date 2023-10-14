import './App.scss';
import Signin from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <div className="App">
        <Container>
            <Row>
                <Col>
                    <Signin/>
                </Col>
                <Col>
                    Placeholder
                    {/*  <SignUp/>*/}
                </Col>
            </Row>


        </Container>
    </div>
  );
}

export default App;
