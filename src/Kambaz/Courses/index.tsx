import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";
import {useState} from "react";
import * as db from "../Database";


// eslint-disable-next-line
export default function Courses({ courses }: { courses: any[]; }) {

    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    // eslint-disable-next-line
    const [modules, setModules] = useState<any[]>(db.modules);

    return (
        <div id="wd-courses">
            <div className="text-start">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
                </div>
            <hr/><hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={
                            <Home
                                modules={modules}
                                setModules={setModules}
                            />
                        } />
                        <Route path="Modules" element={
                            <Modules
                                modules={modules}
                                setModules={setModules}
                            />
                        } />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

