import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";

export default function ProtectedCourseRoute() {
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // eslint-disable-next-line
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const { cid } = useParams();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (currentUser.role === "STUDENT") {
        const isEnrolled = enrollments.some(
            (enrollment) => enrollment.course === cid && enrollment.user === currentUser._id
        );

        if (!isEnrolled) {
            return <Navigate to="/Kambaz/Dashboard" />;
        }
    }

    return <Outlet />;
}