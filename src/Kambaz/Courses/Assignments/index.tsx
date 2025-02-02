import { ListGroup, Button, Form, InputGroup } from "react-bootstrap";
import { BsSearch, BsThreeDotsVertical, BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentIcon from "./AssignmentIcon";

export default function Assignments() {
    return (
        <div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <InputGroup style={{ width: "300px" }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <BsSearch className="text-secondary" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search for Assignments"
                        className="border-start-0"
                    />
                </InputGroup>

                <div>
                    <Button variant="secondary" className="me-2">
                        <FaPlus className="me-2 mb-1" />
                        Group
                    </Button>
                    <Button variant="danger">
                        <FaPlus className="me-2 mb-1" />
                        Assignment
                    </Button>
                </div>
            </div>

            <ListGroup className="rounded-0 border">
                <ListGroup.Item className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <span className="fs-5 fw-bold">ASSIGNMENTS</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="text-secondary me-3">40% of Total</span>
                        <FaPlus className="me-3" />
                        <BsThreeDotsVertical />
                    </div>
                </ListGroup.Item>

                <ListGroup className="rounded-0">
                    <ListGroup.Item className="wd-lesson p-3 ps-3 border-bottom">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-3" />
                            <AssignmentIcon className="me-3" />
                            <div className="flex-grow-1 text-start">
                                <a href="#/Kambaz/Courses/1234/Assignments/123"
                                   className="fs-5 fw-bold text-decoration-none text-dark">
                                    A1
                                </a>
                                <div className="text-secondary small">
                                    <span className="text-danger fw-bold">Multiple Modules</span> |
                                    <span className="fw-bold"> Not available until</span> May 6 at 12:00am
                                    <br />
                                    <span className="fw-bold">Due</span> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <GreenCheckmark />
                                <BsThreeDotsVertical className="fs-4 ms-2" />
                            </div>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-lesson p-3 ps-3 border-bottom">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-3" />
                            <AssignmentIcon className="me-3" />
                            <div className="flex-grow-1 text-start">
                                <a href="#/Kambaz/Courses/1234/Assignments/124"
                                   className="fs-5 fw-bold text-decoration-none text-dark">
                                    A2
                                </a>
                                <div className="text-secondary small">
                                    <span className="text-danger fw-bold">Multiple Modules</span> |
                                    <span className="fw-bold"> Not available until</span> May 13 at 12:00am
                                    <br />
                                    <span className="fw-bold">Due</span> May 20 at 11:59pm | 100 pts
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <GreenCheckmark />
                                <BsThreeDotsVertical className="fs-4 ms-2" />
                            </div>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-lesson p-3 ps-3 border-bottom">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-3" />
                            <AssignmentIcon className="me-3" />
                            <div className="flex-grow-1 text-start">
                                <a href="#/Kambaz/Courses/1234/Assignments/125"
                                   className="fs-5 fw-bold text-decoration-none text-dark">
                                    A3
                                </a>
                                <div className="text-secondary small">
                                    <span className="text-danger fw-bold">Multiple Modules</span> |
                                    <span className="fw-bold"> Not available until</span> May 20 at 12:00am
                                    <br />
                                    <span className="fw-bold">Due</span> May 27 at 11:59pm | 100 pts
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <GreenCheckmark />
                                <BsThreeDotsVertical className="fs-4 ms-2" />
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </ListGroup>
        </div>
    );
}


