import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line
export default function ProtectedFacultyRoute({ children }: { children: any }) {
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (currentUser?.role === "FACULTY") {
        return children;
    } else {
        return <Navigate to="/Kambaz/Courses" />;
    }
}
