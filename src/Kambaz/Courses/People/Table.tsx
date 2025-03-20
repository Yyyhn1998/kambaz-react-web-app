import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as peopleClient from "./client"; //

interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
}

export default function PeopleTable() {
    const { cid } = useParams();
    const [courseUsers, setCourseUsers] = useState<UserType[]>([]);

    useEffect(() => {
        if (cid) {
            peopleClient.fetchPeopleInCourse(cid).then(setCourseUsers).catch(err => {
                console.error("Failed to fetch people:", err);
            });
        }
    }, [cid]);

    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                <tr>
                    <th style={{ width: "25%" }}>Name</th>
                    <th style={{ width: "15%" }}>Login ID</th>
                    <th style={{ width: "10%" }}>Section</th>
                    <th style={{ width: "15%" }}>Role</th>
                    <th style={{ width: "20%" }}>Last Activity</th>
                    <th style={{ width: "15%" }}>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {courseUsers.map((user) => (
                    <tr key={user._id}>
                        <td className="d-flex align-items-center gap-2">
                            <FaUserCircle className="fs-2 text-secondary" />
                            <span className="wd-first-name">{user.firstName}</span> {" "}
                            <span className="wd-last-name">{user.lastName}</span>
                        </td>
                        <td className="wd-login-id">{user.loginId}</td>
                        <td className="wd-section">{user.section}</td>
                        <td className="wd-role">{user.role}</td>
                        <td className="wd-last-activity">{user.lastActivity}</td>
                        <td className="wd-total-activity">{user.totalActivity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
