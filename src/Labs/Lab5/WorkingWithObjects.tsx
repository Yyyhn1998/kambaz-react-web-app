import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [module, setModule] = useState({
        id: "CS5610",
        name: "Web Development",
        description: "Full Stack Development",
        course: "Computer Science",
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects" className="container mt-4">
            <h3 className="mb-4">Working With Objects</h3>

            <h4 className="mt-4">Modifying Assignment Title</h4>
            <div className="d-flex gap-2">
                <FormControl
                    className="w-50"
                    defaultValue={assignment.title}
                    onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                />
                <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title
                </a>
            </div>
            <hr />

            <h4 className="mt-4">Retrieving Assignment</h4>
            <div className="d-flex gap-2">
                <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`}>
                    Get Assignment
                </a>
                <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`}>
                    Get Title
                </a>
            </div>
            <hr />

            <h4 className="mt-4">Retrieving Module</h4>
            <div className="d-flex gap-2">
                <a className="btn btn-primary" href={`${MODULE_API_URL}`}>
                    Get Module
                </a>
                <a className="btn btn-primary" href={`${MODULE_API_URL}/name`}>
                    Get Module Name
                </a>
            </div>
            <hr />

            <h4 className="mt-4">Modifying Module</h4>
            <div className="d-flex gap-2">
                <FormControl
                    className="w-50"
                    defaultValue={module.name}
                    onChange={(e) => setModule({ ...module, name: e.target.value })}
                />
                <a className="btn btn-primary" href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Name
                </a>
            </div>

            <div className="d-flex gap-2 mt-2">
                <FormControl
                    className="w-50"
                    defaultValue={module.description}
                    onChange={(e) => setModule({ ...module, description: e.target.value })}
                />
                <a className="btn btn-primary" href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Description
                </a>
            </div>
            <hr />

            <h4 className="mt-4">Modifying Assignment</h4>
            <div className="d-flex gap-2">
                <FormControl
                    type="number"
                    className="w-25"
                    defaultValue={assignment.score}
                    onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value) })}
                />
                <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Score
                </a>
            </div>

            <div className="d-flex gap-2 mt-2 align-items-center">
                <input
                    type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completed
                </a>
            </div>
            <hr />
        </div>
    );
}
