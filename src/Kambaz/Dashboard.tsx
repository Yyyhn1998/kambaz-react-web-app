import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/reactjs.jpg" width={200}/>
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5100/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/ai.jpg" width={200}/>
                        <div>
                            <h5> CS5100 Fundamental of AI </h5>
                            <p className="wd-dashboard-course-title">
                                AI developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5999/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/anime.jpg" width={200}/>
                        <div>
                            <h5> AS5999 Fundamental of Anime </h5>
                            <p className="wd-dashboard-course-title">
                                Anime developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1111/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/graphic.jpg" width={200} alt="Graphic Design"/>
                        <div>
                            <h5> CS1111 Graphic Design </h5>
                            <p className="wd-dashboard-course-title">
                                Master the principles of design
                            </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2222/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/animation.jpg" width={200} alt="Animation"/>
                        <div>
                            <h5> CS2222 Animation </h5>
                            <p className="wd-dashboard-course-title">
                                Create stunning animations using Adobe After Effects
                            </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3333/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/photography.jpg" width={200} alt="Photography"/>
                        <div>
                            <h5> CS3333 Photography </h5>
                            <p className="wd-dashboard-course-title">
                                Learn the art of photography and photo editing
                            </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/4444/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/video.jpg" width={200} alt="Video Editing"/>
                        <div>
                            <h5> CS4444 Video Editing </h5>
                            <p className="wd-dashboard-course-title">
                                Edit videos with Adobe Premiere
                            </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}

