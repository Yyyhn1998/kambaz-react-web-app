import ModulesControls from "./ModulesControls";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons.tsx";

export default function Modules() {
    return (
        <div>
            <ModulesControls />
            <br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
                        <div>
                            <BsGripVertical className="me-2 fs-3" /> Week 1
                        </div>
                        <ModuleControlButtons />
                    </div>


                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                            <div>
                                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Introduction to the course
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Learn what is Web Development
                        </ListGroup.Item>

                        <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                            <div>
                                <BsGripVertical className="me-2 fs-3" /> READINGS
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Full Stack Developer - Chapter 1 - Introduction
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Full Stack Developer - Chapter 2 - Creating Us
                        </ListGroup.Item>

                        <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                            <div>
                                <BsGripVertical className="me-2 fs-3" /> SLIDES
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Introduction to Web Development
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Creating an HTTP server with Node.js
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Creating a React Application
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>

                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
                        <div>
                            <BsGripVertical className="me-2 fs-3" /> Week 2
                        </div>
                        <ModuleControlButtons />
                    </div>


                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                            <div>
                                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Learn how to create user interfaces with HTML
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Deploy the assignment to Netlify
                        </ListGroup.Item>

                        <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                            <div>
                                <BsGripVertical className="me-2 fs-3" /> SLIDES
                            </div>
                            <LessonControlButtons />
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Introduction to HTML and the DOM
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Formatting Web content with Headings and Lists
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lessons p-3 ps-4">
                            Formatting content with Lists and Tables
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}


