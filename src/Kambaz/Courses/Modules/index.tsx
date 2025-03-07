import { useParams } from "react-router";
import { FormControl, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { ModuleType } from "./types"; // Adjust path as needed

// Add interface for component props
interface ModulesProps {
    modules?: ModuleType[];
    setModules?: (modules: ModuleType[]) => void;
}

// Update component to accept props
export default function Modules({ modules: propModules, setModules }: ModulesProps = {}) {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");

    // eslint-disable-next-line
    const { modules: reduxModules } = useSelector((state: any) => state.modulesReducer);

    // Use either props modules or Redux modules
    const modulesToUse = propModules || reduxModules;

    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    return (
        <div>
            {currentUser?.role === "FACULTY" && (
                <ModulesControls
                    moduleName={moduleName}
                    setModuleName={setModuleName}
                    addModule={() => {
                        dispatch(addModule({ name: moduleName, course: cid }));
                        // If setModules prop is provided, use it
                        if (setModules && propModules) {
                            const newModule = {
                                _id: Date.now().toString(),
                                name: moduleName,
                                course: cid || ""
                            };
                            setModules([...propModules, newModule]);
                        }
                        setModuleName("");
                    }}
                />
            )}

            <br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modulesToUse
                    // eslint-disable-next-line
                    .filter((module: any) => module.course === cid)
                    // eslint-disable-next-line
                    .map((module: any) => (
                        <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    {!module.editing && module.name}
                                    {module.editing && (
                                        <FormControl
                                            className="w-50 d-inline-block"
                                            onChange={(e) =>
                                                dispatch(updateModule({ ...module, name: e.target.value }))
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    dispatch(updateModule({ ...module, editing: false }));
                                                }
                                            }}
                                            defaultValue={module.name}
                                        />
                                    )}
                                </div>

                                {currentUser?.role === "FACULTY" && (
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={() => dispatch(deleteModule(module._id))}
                                        editModule={() => dispatch(editModule(module._id))}
                                    />
                                )}
                            </div>

                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {/* eslint-disable-next-line*/}
                                    {module.lessons.map((lesson: any) => (
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