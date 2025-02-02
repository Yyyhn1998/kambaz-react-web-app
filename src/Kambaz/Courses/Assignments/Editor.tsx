import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <Container className="mt-4">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="d-block text-left">Assignment Name</Form.Label>
                    <Form.Control type="text" defaultValue="A1" className="w-100" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Card>
                        <Card.Body className="p-0">
                            <Form.Control
                                as="textarea"
                                defaultValue={`The assignment is available online.\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.`}
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

                <Row className="mb-3 ">
                    <Col sm={3} className="text-end">
                        <Form.Label>Display Grade as</Form.Label>
                    </Col>
                    <Col sm={9} >
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

                <Row className="mb-3 align-items-center">
                    <Col sm={3} className="text-end">
                        <Form.Label>Assign</Form.Label>
                    </Col>
                    <Col sm={9}></Col>
                </Row>

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
                    <Button variant="secondary" className="me-2">Cancel</Button>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </Container>
    );
}
