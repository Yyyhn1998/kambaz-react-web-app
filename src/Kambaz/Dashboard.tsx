import { useSelector, useDispatch } from "react-redux";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setEnrollments } from "./Account/Enrollments/enrollmentsReducer";
import * as enrollmentsClient from "./Account/Enrollments/client";

interface CourseType {
    _id: string;
    name: string;
    description: string;
    enrolled?: boolean;
}

export default function Dashboard({
                                      courses,
                                      course,
                                      setCourse,
                                      addNewCourse,
                                      deleteCourse,
                                      updateCourse,
                                      enrolling,
                                      setEnrolling,
                                     updateEnrollment
}: {
    courses: CourseType[];
    course: CourseType;
    setCourse: (course: CourseType) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    //const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const seen = new Set();
    courses.filter(c => c && c._id).forEach(c => {
        if (seen.has(c._id)) console.warn("Duplicate course _id:", c._id);
        seen.add(c._id);
    });

    //const isStudent = currentUser?.role === "STUDENT";

    useEffect(() => {
        if (currentUser) {
            enrollmentsClient.fetchUserEnrollments(currentUser._id)
                .then((data) => dispatch(setEnrollments(data)))
                .catch(error => console.error("Error fetching enrollments:", error));
        }
    }, [currentUser, dispatch]);

   /* const handleEnrollCourse = async (courseId: string) => {
        if (!currentUser) return;
        try {
            await enrollmentsClient.enrollUser(currentUser._id, courseId);
            dispatch(enrollCourse({ courseId, userId: currentUser._id }));
        } catch (error) {
            console.error("Failed to enroll", error);
        }
    };

    const handleUnenrollCourse = async (courseId: string) => {
        if (!currentUser) return;
        try {
            await enrollmentsClient.unenrollUser(currentUser._id, courseId);
            dispatch(unenrollCourse({ courseId, userId: currentUser._id }));
        } catch (error) {
            console.error("Failed to unenroll", error);
        }
    }; */

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary">
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
            <hr />

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
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />

            {courses.length === 0 ? (
                <h3 className="text-danger">No Courses Available</h3>
            ) : (
                <div className="row row-cols-1 row-cols-md-5 g-4">

                    {courses
                        .filter((course) => course && course._id)
                            .map((course) => (
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

                                        {enrolling && (
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    updateEnrollment(course._id, !course.enrolled);
                                                }}
                                                className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                                            >
                                                {course.enrolled ? "Unenroll" : "Enroll"}
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
                    ))}
                </div>
            )}
        </div>
    );
}
