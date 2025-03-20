import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setEnrollments } from "./Enrollments/enrollmentsReducer";
import * as enrollmentsClient from "./Enrollments/client";
import {EnrollmentType} from "./Enrollments/types.ts";

export default function ProtectedCourseRoute() {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // eslint-disable-next-line
    const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
    const { cid } = useParams();

    useEffect(() => {
        if (currentUser && currentUser.role === "STUDENT") {
            enrollmentsClient.fetchUserEnrollments(currentUser._id)
                .then((data) => dispatch(setEnrollments(data)))
                .catch((error) => console.error("Failed to fetch enrollments:", error));
        }
    }, [currentUser, dispatch]);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (currentUser.role === "STUDENT") {
        const isEnrolled = enrollments.some(
            (e: EnrollmentType) => e.course === cid && e.user === currentUser?._id
        );

        if (!isEnrolled) {
            return <Navigate to="/Kambaz/Dashboard" />;
        }
    }

    return <Outlet />;
}
