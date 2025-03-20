import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function TOC() {
    const { pathname } = useLocation();

    return (
        <Nav variant="pills" id="wd-toc">
            <Nav.Item>
                <Link to="/Labs" >
                    <Nav.Link as="span" active={pathname.includes("Labs")}> Labs </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Labs/Lab1" >
                    <Nav.Link as="span" active={pathname.includes("Lab1")}> Lab 1 </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Labs/Lab2" >
                    <Nav.Link as="span" active={pathname.includes("Lab2")}> Lab 2 </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Labs/Lab3" >
                    <Nav.Link as="span" active={pathname.includes("Lab3")}> Lab 3 </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Labs/Lab4" >
                    <Nav.Link as="span" active={pathname.includes("Lab4")}> Lab 4 </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Labs/Lab5" >
                    <Nav.Link as="span" active={pathname.includes("Lab5")}> Lab 5 </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/Kambaz" >
                    <Nav.Link as="span"> Kambaz </Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="https://github.com/Yyyhn1998/kambaz-react-web-app" target="_blank" > My GitHub </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

