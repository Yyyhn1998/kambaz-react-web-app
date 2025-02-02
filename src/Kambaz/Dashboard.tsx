import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={3} lg={4} className="g-4">

                    {/* CS1234 React JS */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Full Stack software developer
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* CS5100 Fundamental of AI */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/5100/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/ai.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS5100 Fundamental of AI</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        AI developer software developer
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* AS5999 Fundamental of Anime */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/5999/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/anime.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">AS5999 Fundamental of Anime</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Anime developer software developer
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* CS1111 Graphic Design */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/1111/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/graphic.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS1111 Graphic Design</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Master the principles of design
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* CS2222 Animation */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/2222/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/animation.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS2222 Animation</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Create stunning animations using Adobe
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* CS3333 Photography */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/3333/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/photography.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS3333 Photography</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Learn the art of photography and photo editing
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* CS4444 Video Editing */}
                    <Col className="wd-dashboard-course" style={{ width: "250px" }}>
                        <Card className="h-100">
                            <Link to="/Kambaz/Courses/4444/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/video.jpg" width="100%" height={160}/>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="wd-dashboard-course-title">CS4444 Video Editing</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description flex-grow-1">
                                        Edit videos with using Adobe Premiere
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                </Row>
            </div>
        </div>
    );
}


