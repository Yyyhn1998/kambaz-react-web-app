import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
//import * as db from "../Database";
import { Form, Button, Container } from "react-bootstrap";
//import { UserType } from "./types"
import * as client from "./client";

export default function Signup() {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async () => {
        if (!newUser.username || !newUser.password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const user = await client.signup(newUser);
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Account/Profile");
            // eslint-disable-next-line
        } catch (e: any) {
            alert("Username already exists. Please choose another one.");
        }
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
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser((prev) => ({ ...prev, username: e.target.value }))
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser((prev) => ({ ...prev, password: e.target.value }))
                            }
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
