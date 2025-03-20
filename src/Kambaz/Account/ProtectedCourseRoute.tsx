import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setEnrollments } from "./Enrollments/enrollmentsReducer";
import * as enrollmentsClient from "./Enrollments/client";

export default function ProtectedCourseRoute() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
    const { cid } = useParams();

    useEffect(() => {
        if (currentUser && currentUser.role === "STUDENT") {
            enrollmentsClient.fetchUserEnrollments(currentUser._id)
                .then((data) => dispatch(setEnrollments(data))) // ✅ Redux 状态更新
                .catch((error) => console.error("Failed to fetch enrollments:", error)); // ❌ 防止 API 出错无反馈
        }
    }, [currentUser, dispatch]); // ✅ 这样 useEffect 只有在 `currentUser` 变化时才会运行

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (currentUser.role === "STUDENT") {
        const isEnrolled = enrollments.some(
            (e) => e.course === cid && e.user === currentUser._id
        );

        if (!isEnrolled) {
            return <Navigate to="/Kambaz/Dashboard" />;
        }
    }

    return <Outlet />;
}
