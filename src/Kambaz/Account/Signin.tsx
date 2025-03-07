import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import { Container, Form, Button, FormControl } from "react-bootstrap";

export default function Signin() {
    const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = () => {
        const user = db.users.find(
            // eslint-disable-next-line
            (u: any) => u.username === credentials.username && u.password === credentials.password
        );
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-25">
                <h2 className="text-center">Sign in</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <FormControl
                            defaultValue={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="Username"
                            id="wd-username"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FormControl
                            type="password"
                            defaultValue={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="Password"
                            id="wd-password"
                        />
                    </Form.Group>

                    <Button onClick={signin} variant="primary" className="w-100" id="wd-signin-btn">
                        Sign in
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <Link to="/Kambaz/Account/Signup" id="wd-signup-link">Sign up</Link>
                </div>
            </div>
        </Container>
    );
}
