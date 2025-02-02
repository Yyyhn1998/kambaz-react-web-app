import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Signin() {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-25">
                <h2 className="text-center">Signin</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                    <Button variant="primary" className="w-100">Signin</Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/Kambaz/Account/Signup">Signup</Link>
                </div>
            </div>
        </Container>
    );
}


