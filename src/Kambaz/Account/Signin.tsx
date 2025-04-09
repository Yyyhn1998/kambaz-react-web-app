import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import * as db from "../Database";
import { Container, Form, Button, FormControl, Card } from "react-bootstrap";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        const user =  await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };

    return (
        <Container>
            <div className="d-flex justify-content-center mt-5">
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
            </div>

            {/* information card */}
            <Card className="mt-5 mb-5">
                <Card.Header as="h3" className="text-center bg-primary text-white">
                    Team Information
                </Card.Header>
                <Card.Body>
                    <h4>Team Members:</h4>
                    <ul>
                        <li><strong>Haoning Yin</strong> - Section CS5610 SPR25 Sec01</li>
                        <li><strong>Xinjie Shen</strong> - Section CS5610 SPR25 Sec01</li>

                    </ul>

                    <h4 className="mt-4">Project Links:</h4>
                    <ul>
                        <li>
                            <strong>React.js Project:</strong>{" "}
                            <a href="https://https://github.com/Yyyhn1998/kambaz-react-web-app" target="_blank" rel="noopener noreferrer">
                                GitHub Repository - Kambaz React Web App
                            </a>
                        </li>
                        <li>
                            <strong>Node.js Project:</strong>{" "}
                            <a href="https://https://github.com/Yyyhn1998/kambaz-node-server-app" target="_blank" rel="noopener noreferrer">
                                GitHub Repository - Kambaz Node Server App
                            </a>
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
}