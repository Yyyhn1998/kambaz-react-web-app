import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import './index.css';
import "./styles.css";
import {useEffect, useState} from "react";
import ProtectedRoute from "./Account/ProtectedRoute.tsx";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import {useSelector} from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    // eslint-disable-next-line
    const [courses, setCourses] = useState<any[]>([]);
    // eslint-disable-next-line
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async() => {
        const newCourse = await userClient.createCourse(course);
        setCourses([ ...courses, newCourse ]);

    };
    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    return (
        <Session>
        <div id="wd-kambaz">
            <KambazNavigation />
        <div className="wd-main-content-offset p-3">
            <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="Dashboard" element={
                    <ProtectedRoute><Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse} />
                    </ProtectedRoute> } />

                <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
        </div>
        </div>
        </Session>
    );}


