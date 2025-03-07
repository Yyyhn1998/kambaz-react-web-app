import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";
import { Form, Button, Container } from "react-bootstrap";

export default function Signup() {
    const [newUser, setNewUser] = useState<{ username?: string; password?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = () => {
        if (!newUser.username || !newUser.password) {
            alert("Please enter both username and password.");
            return;
        }

        // eslint-disable-next-line
        const existingUser = db.users.find((u: any) => u.username === newUser.username);
        if (existingUser) {
            alert("Username already exists. Please choose another one.");
            return;
        }

        const user = { ...newUser, _id: Date.now().toString(), role: "STUDENT" }; // 默认角色: STUDENT
        db.users.push(user);
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-25">
                <h2 className="text-center">Signup</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="primary" className="w-100" onClick={signup}>
                        Sign up
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Link to="/Kambaz/Account/Signin">Already have an account? Sign in</Link>
                </div>
            </div>
        </Container>
    );
}
