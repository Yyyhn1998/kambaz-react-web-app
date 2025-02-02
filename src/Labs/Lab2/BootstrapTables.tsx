import "./index.css";
import { Table } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

export default function BootstrapTables() {
    return (
        <div id="wd-css-boot-tables">
            <div id="wd-css-styling-tables">
                <h2>Tables</h2>
                <Table>
                    <thead>
                    <tr className="table-dark">
                        <th>Quiz</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="table-warning">
                        <td>Q1</td>
                        <td>HTML</td>
                        <td>2/3/21</td>
                        <td>85</td>
                    </tr>
                    <tr className="table-danger">
                        <td>Q2</td>
                        <td>CSS</td>
                        <td>2/10/21</td>
                        <td>90</td>
                    </tr>
                    <tr className="table-primary">
                        <td>Q3</td>
                        <td>JavaScript</td>
                        <td>2/17/21</td>
                        <td>90</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr className="table-success">
                        <td colSpan={3}>Average</td>
                        <td>90</td>
                    </tr>
                    </tfoot>
                </Table>
            </div>
            <div id="wd-css-responsive-tables">
                <h2>Responsive tables</h2>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Very</th>
                        <th>long</th>
                        <th>set</th>
                        <th>of</th>
                        <th>columns</th>
                        <th>Very</th>
                        <th>long</th>
                        <th>set</th>
                        <th>of</th>
                        <th>columns</th>
                        <th>Very</th>
                        <th>long</th>
                        <th>set</th>
                        <th>of</th>
                        <th>columns</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Very</td>
                        <td>long</td>
                        <td>set</td>
                        <td>of</td>
                        <td>columns</td>
                        <td>Very</td>
                        <td>long</td>
                        <td>set</td>
                        <td>of</td>
                        <td>columns</td>
                        <td>Very</td>
                        <td>long</td>
                        <td>set</td>
                        <td>of</td>
                        <td>columns</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <div id="wd-css-styling-lists">
                <h2>Favorite movies</h2>
                <ListGroup>
                    <ListGroup.Item active>Aliens</ListGroup.Item>
                    <ListGroup.Item>Terminator</ListGroup.Item>
                    <ListGroup.Item>Blade Runner</ListGroup.Item>
                    <ListGroup.Item>Lord of the Ring</ListGroup.Item>
                    <ListGroup.Item disabled>Star Wars</ListGroup.Item>
                </ListGroup>
            </div>
            <div id="wd-css-hyperlink-list">
                <h3>Favorite books</h3>
                <ListGroup>
                    <ListGroup.Item action active
                                    href="https://en.wikipedia.org/wiki/Dune_(novel)">
                        Dune </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings">
                        Lord of the Rings </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/The_Forever_War">
                        The Forever War </ListGroup.Item>
                    <ListGroup.Item action
                                    href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)">
                        2001 A Space Odyssey </ListGroup.Item>
                    <ListGroup.Item action disabled
                                    href="https://en.wikipedia.org/wiki/Ender%27s_Game">
                        Ender's Game </ListGroup.Item>
                    <ListGroup.Item action onClick={() => alert("New book added")}>
                        Add another book </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
}