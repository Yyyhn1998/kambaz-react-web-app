import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button, Container } from "react-bootstrap";

export default function Profile() {
    // eslint-disable-next-line
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin");
        } else {
            setProfile(currentUser);
        }
    }, [currentUser, navigate]);

    const signout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-25">
                <h2 className="text-center">Profile</h2>
                {profile && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={profile.username || ""}
                                placeholder="Username"
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                value={profile.password || ""}
                                placeholder="Password"
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={profile.firstName || ""}
                                placeholder="First Name"
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={profile.lastName || ""}
                                placeholder="Last Name"
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="date"
                                value={profile.dob || ""}
                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                value={profile.email || ""}
                                placeholder="Email"
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Select
                                value={profile.role || "USER"}
                                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="danger" className="w-100" onClick={signout}>
                            Sign out
                        </Button>
                    </Form>
                )}
            </div>
        </Container>
    );
}
