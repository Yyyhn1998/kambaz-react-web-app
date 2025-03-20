import { useSelector, useDispatch } from "react-redux";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { enrollCourse, unenrollCourse, setEnrollments } from "./Account/Enrollments/enrollmentsReducer";
import * as enrollmentsClient from "./Account/Enrollments/client";
import { EnrollmentType } from "./Account/Enrollments/types";

interface CourseType {
    _id: string;
    name: string;
    description: string;
}

export default function Dashboard({
                                      courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
                                  }: {
    courses: CourseType[];
    course: CourseType;
    setCourse: (course: CourseType) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
}) {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // eslint-disable-next-line
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const [showAllCourses, setShowAllCourses] = useState(false);
    const [allCourses, setAllCourses] = useState<CourseType[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const isStudent = currentUser?.role === "STUDENT";

    useEffect(() => {
        if (currentUser) {
            console.log("Fetching enrollments for user:", currentUser._id);
            enrollmentsClient.fetchUserEnrollments(currentUser._id).then((data) => {
                console.log("Fetched user enrollments:", data);
                dispatch(setEnrollments(data));
            }).catch(error => {
                console.error("Error fetching enrollments:", error);
            });
        }
    }, [currentUser, dispatch, refreshTrigger]);

    useEffect(() => {
        if (showAllCourses && isStudent) {
            console.log("Fetching all courses");
            enrollmentsClient.fetchAllCourses().then(data => {
                console.log("Fetched all courses:", data);
                setAllCourses(data);
            }).catch(error => {
                console.error("Error fetching all courses:", error);
            });
        }
    }, [showAllCourses, isStudent]);

    const handleEnrollCourse = async (courseId: string) => {
        if (!currentUser) return;

        console.log("Trying to enroll in course:", courseId);

        try {
            await enrollmentsClient.enrollUser(currentUser._id, courseId);
            console.log("Successfully enrolled in course:", courseId);
            dispatch(enrollCourse({ courseId, userId: currentUser._id }));

            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Failed to enroll", error);
        }
    };

    const handleUnenrollCourse = async (courseId: string) => {
        if (!currentUser) return;

        try {
            await enrollmentsClient.unenrollUser(currentUser._id, courseId);
            dispatch(unenrollCourse({ courseId, userId: currentUser._id }));

            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Failed to unenroll", error);
        }
    };

    const filteredCourses = isStudent
        ? showAllCourses
            ? allCourses.length > 0 ? allCourses : courses
            : courses.filter(course => enrollments.some(
                (enrollment: EnrollmentType) => enrollment.course === course._id && enrollment.user === currentUser?._id
            ))
        : courses;

    console.log("Rendering courses:", {
        showAllCourses,
        enrollmentsCount: enrollments.length,
        allCoursesCount: allCourses.length,
        coursesCount: courses.length,
        filteredCoursesCount: filteredCourses.length
    });

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {isStudent && (
                <button
                    className="btn btn-primary float-end"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                >
                    {showAllCourses ? "Show My Courses" : "Show All Courses"}
                </button>
            )}

            {currentUser?.role === "FACULTY" && (
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end" onClick={addNewCourse}>Add</button>
                        <button className="btn btn-warning float-end me-2" onClick={updateCourse}>Update</button>
                    </h5>
                    <br />
                    <FormControl
                        value={course.name}
                        className="mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <FormControl
                        as="textarea"
                        value={course.description}
                        rows={3}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                </div>
            )}

            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
            <hr />

            {filteredCourses.length === 0 ? (
                <h3 className="text-danger">No Courses Available</h3>
            ) : (
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredCourses.map((course) => {
                        const isEnrolled = enrollments.some(
                            (enrollment: EnrollmentType) => enrollment.course === course._id && enrollment.user === currentUser?._id
                        );

                        return (
                            <div key={course._id} className="col" style={{ width: "350px" }}>
                                <div className="card">
                                    <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                                        <img src="/images/reactjs.jpg" className="card-img-top" width="100%" height={160} alt="Course thumbnail" />
                                        <div className="card-body">
                                            <h5 className="card-title text-nowrap overflow-hidden">{course.name}</h5>
                                            <p className="card-text overflow-hidden" style={{ height: "100px" }}>
                                                {course.description}
                                            </p>
                                            <button className="btn btn-primary">Go</button>

                                            {isStudent && (
                                                <button
                                                    className={`btn ${isEnrolled ? "btn-danger" : "btn-success"} float-end`}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        if (isEnrolled) {
                                                            handleUnenrollCourse(course._id);
                                                        } else {
                                                            handleEnrollCourse(course._id);
                                                        }
                                                    }}
                                                >
                                                    {isEnrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}

                                            {currentUser?.role === "FACULTY" && (
                                                <div className="float-end">
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }} className="btn btn-warning me-2">
                                                        Edit
                                                    </button>
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        deleteCourse(course._id);
                                                    }} className="btn btn-danger">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}