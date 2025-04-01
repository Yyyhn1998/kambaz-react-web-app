import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import './index.css';
import "./styles.css";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute.tsx";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

export default function Kambaz() {
    // eslint-disable-next-line
    const [courses, setCourses] = useState<any[]>([]);
    // eslint-disable-next-line
    const [course, setCourse] = useState<any>({
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
    });

    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        try {
            if (enrolled) {
                await userClient.enrollIntoCourse(currentUser._id, courseId);
            } else {
                await userClient.unenrollFromCourse(currentUser._id, courseId);
            }
            setCourses(prevCourses =>
                prevCourses.map(course => {
                    if (course._id === courseId) {
                        return { ...course, enrolled: enrolled };
                    } else {
                        return course;
                    }
                })
            );
            if (enrolling) {
                await fetchCourses();
            } else {
                const courses = await userClient.findMyCourses();
                setCourses(courses);
            }
        } catch (error) {
            console.error("unenroll failed:", error);
        }
    };



    const addNewCourse = async () => {
        await courseClient.createCourse(course);
        setCourse({
            name: "New Course",
            number: "New Number",
            description: "New Description",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
            credits: 3,
        });
        await fetchCourses();
    };



    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        await fetchCourses();
        console.log("Delete status:", status);
        console.log("Trying to delete course with ID:", courseId);
        const allCourses = await courseClient.fetchAllCourses();
        // eslint-disable-next-line
        console.log("Current courses in DB:", allCourses.map((c: any) => c._id));
       // setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        await fetchCourses();
        setCourses(courses.map((c) => c._id === course._id ? course : c));
    };

    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
// eslint-disable-next-line
            const coursesWithStatus = allCourses.map((course: any) => {
                if (!course || !course._id) {
                    console.warn("Invalid course detected:", course);
                    return null;
                }
// eslint-disable-next-line
                const isEnrolled = enrolledCourses.find((c: any) => c && c._id === course._id);
                return isEnrolled ? { ...course, enrolled: true } : course;
                // eslint-disable-next-line
            }).filter((c: any) => c !== null);

            setCourses(coursesWithStatus);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    /*useEffect(() => {
        if (currentUser) {
            fetchCourses();
        }
    }, [currentUser]); */


    useEffect(() => {
        if (!currentUser) return;

        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    enrolling={enrolling}
                                    setEnrolling={setEnrolling}
                                    updateEnrollment={updateEnrollment}
                                />
                            </ProtectedRoute>} />
                        <Route path="Courses/:cid/*"
                               element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}

