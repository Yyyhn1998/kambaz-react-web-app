import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { FaBullhorn, FaChartBar, FaBell } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
        return (
            <div id="wd-course-status" style={{ width: "250px" }}>
                    <h2 className="fs-6">Course Status</h2>
                    <div className="d-flex">
                            <div className="w-50 pe-1">
                                    <Button variant="secondary" size="sm" className="w-100 d-flex align-items-center justify-content-center text-nowrap py-2 px-2">
                                            <MdDoNotDisturbAlt className="me-2 fs-6" /> Unpublish
                                    </Button>
                            </div>
                            <div className="w-50">
                                    <Button variant="success" size="sm" className="w-100 d-flex align-items-center justify-content-center text-nowrap py-2 px-2">
                                            <FaCheckCircle className="me-2 fs-6" /> Publish
                                    </Button>
                            </div>
                    </div>

                    <br />
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <BiImport className="me-2 fs-6" /> Import Existing Content
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <LiaFileImportSolid className="me-2 fs-6" /> Import from Commons
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <AiFillHome className="me-2 fs-6" /> Choose Home Page
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <BsGraphUp className="me-2 fs-6" /> View Course Stream
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <FaBullhorn className="me-2 fs-6" /> New Announcement
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <FaChartBar className="me-2 fs-6" /> New Analytics
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <FaCheckCircle className="me-2 fs-6" /> Publish
                    </Button>
                    <Button variant="secondary" size="sm" className="w-100 mt-1 text-start d-flex align-items-center text-nowrap py-2 px-2">
                            <FaBell className="me-2 fs-6" /> View Course Notifications
                    </Button>

            </div>
        );}
