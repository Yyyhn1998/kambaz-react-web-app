import { useParams, Link } from "react-router-dom";
import { assignments } from "../../Database";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = assignments.find(a => a._id === aid);

    if (!assignment) {
        return <h2 className="text-danger">Assignment not found</h2>;
    }

    return (
        <Container className="mt-4">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block text-left">Assignment Name</Form.Label>
                    <Form.Control type="text" defaultValue={assignment.title} className="w-100" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Card>
                        <Card.Body className="p-0">
                            <Form.Control
                                as="textarea"
                                defaultValue={`This is the description for ${assignment.title}`}
                                className="h-100 w-100 border-0"
                                style={{ minHeight: "200px" }}
                            />
                        </Card.Body>
                    </Card>
                </Form.Group>

                <Row className="mb-3">
                    <Col sm={3} className="text-end">
                        <Form.Label>Points</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Control type="number" defaultValue="100" className="w-50 ms-auto" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={3} className="text-end">
                        <Form.Label>Assignment Group</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Select className="w-50 ms-auto">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>PROJECTS</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={3} className="text-end">
                        <Form.Label>Display Grade as</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Select className="w-50 ms-auto">
                            <option>Percentage</option>
                            <option>Complete/Incomplete</option>
                            <option>Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col sm={3} className="text-end">
                        <Form.Label>Submission Type</Form.Label>
                    </Col>
                    <Col sm={9}></Col>
                </Row>

                <Card className="mb-3 w-50 ms-auto">
                    <Card.Body>
                        <Row className="mb-3 ms-auto">
                            <Col sm={12} className="d-flex justify-content-center">
                                <Form.Select style={{ width: "100%" }}>
                                    <option>Online</option>
                                    <option>On Paper</option>
                                    <option>External Tool</option>
                                    <option>No Submission</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <div className="d-flex flex-column align-items-start">
                            <h6 className="fw-bold">Online Entry Options</h6>
                            <Form.Check type="checkbox" label="Text Entry" />
                            <Form.Check type="checkbox" label="Website URL" defaultChecked />
                            <Form.Check type="checkbox" label="Media Recordings" />
                            <Form.Check type="checkbox" label="Student Annotation" />
                            <Form.Check type="checkbox" label="File Uploads" />
                        </div>
                    </Card.Body>
                </Card>

                <Card className="mb-3 w-50 ms-auto">
                    <Card.Body className="text-start">
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Assign to</Form.Label>
                            <Form.Control type="text" defaultValue="Everyone" className="w-100" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Due</Form.Label>
                            <Form.Control type="date" className="w-100" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Col sm={6}>
                                <Form.Label className="fw-bold">Available from</Form.Label>
                                <Form.Control type="date" className="w-100" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="fw-bold">Until</Form.Label>
                                <Form.Control type="date" className="w-100" />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <div className="d-flex justify-content-end">
                    <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <Button variant="secondary" className="me-2">Cancel</Button>
                    </Link>
                    <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <Button variant="danger">Save</Button>
                    </Link>
                </div>
            </Form>
        </Container>
    );
}

