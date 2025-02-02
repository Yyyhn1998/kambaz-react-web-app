import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Profile() {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-25">
                <h2 className="text-center">Profile</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" defaultValue="alice" placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="password" defaultValue="123" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" defaultValue="Alice" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" defaultValue="Wonderland" placeholder="Last Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="date" defaultValue="2000-01-01" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="email" defaultValue="alice@wonderland.com" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Select defaultValue="FACULTY">
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="danger" className="w-100">
                        Signout
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
