import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
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
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Tony</span> {" "}
                        <span className="wd-last-name">Stark</span>
                    </td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-01</td>
                    <td className="wd-total-activity">10:21:32</td>
                </tr>
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Bruce</span> {" "}
                        <span className="wd-last-name">Wayne</span>
                    </td>
                    <td className="wd-login-id">001234562B</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-09-28</td>
                    <td className="wd-total-activity">12:44:11</td>
                </tr>
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Steve</span> {" "}
                        <span className="wd-last-name">Rogers</span>
                    </td>
                    <td className="wd-login-id">001234563C</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-01</td>
                    <td className="wd-total-activity">08:30:00</td>
                </tr>
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Natasha</span> {" "}
                        <span className="wd-last-name">Romanoff</span>
                    </td>
                    <td className="wd-login-id">001234564N</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-09-20</td>
                    <td className="wd-total-activity">14:50:40</td>
                </tr>
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Adachi</span> {" "}
                        <span className="wd-last-name">Sakura</span>
                    </td>
                    <td className="wd-login-id">001234565A</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-14</td>
                    <td className="wd-total-activity">09:55:22</td>
                </tr>
                <tr>
                    <td className="d-flex align-items-center gap-2">
                        <FaUserCircle className="fs-2 text-secondary" />
                        <span className="wd-first-name">Shimamura</span> {" "}
                        <span className="wd-last-name">Taketsuki</span>
                    </td>
                    <td className="wd-login-id">001234566T</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-09-14</td>
                    <td className="wd-total-activity">10:55:22</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}

