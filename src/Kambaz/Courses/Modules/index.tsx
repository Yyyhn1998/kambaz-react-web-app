import { useParams } from "react-router";
import { modules } from "../../Database";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import ModulesControls from "./ModulesControls";

export default function Modules() {
    const { cid } = useParams();

    return (
        <div>
            <ModulesControls />
            <br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modules
                    .filter((module) => module.course === cid)
                    .map((module) => (
                        <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" /> {module.name}
                                </div>
                                <ModuleControlButtons />
                            </div>

                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {module.lessons.map((lesson) => (
                                        <div key={lesson._id}>
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center wd-lesson p-3 ps-1">
                                                <div>
                                                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                                                </div>
                                                <LessonControlButtons />
                                            </ListGroup.Item>

                                            <ListGroup.Item className="wd-lessons p-3 ps-4">
                                                {lesson.description}
                                            </ListGroup.Item>
                                        </div>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}



