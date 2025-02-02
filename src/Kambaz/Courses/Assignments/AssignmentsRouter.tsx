import { Routes, Route, Navigate } from "react-router-dom";
import Assignments from "./index";
import AssignmentEditor from "./Editor";

export default function AssignmentsRouter() {
    return (
        <div className="p-3">
            <Routes>
                <Route path="/" element={<Navigate to="assignments" />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/assignments/editor" element={<AssignmentEditor />} />
            </Routes>
        </div>
    );
}
