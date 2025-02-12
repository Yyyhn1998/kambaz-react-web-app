import { Link, useParams, useLocation } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

export default function CourseNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();

    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link key={link} to={`/Kambaz/Courses/${cid}/${link}`} className="text-decoration-none">
                    <ListGroup.Item as="span" className={`text-center border-0 
                        ${pathname.includes(link) ? "text-black" : "text-danger"}`}>
                        {link}
                    </ListGroup.Item>
                </Link>
            ))}
        </ListGroup>
    );
}


