export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>

            <label htmlFor="wd-description">Description</label>
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify.The Landing page should include the following:
        Your full name and section Links to each of the lab assignments Link to the kanbas application
        Links to all relevant source code repositories The kanbas application should include a link to navigate
        back to the landing page.

      </textarea>
            <br/>

            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>PROJECTS</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                            <option>Complete/Incomplete</option>
                            <option>Points</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label>Online Entry Options</label>
                    </td>
                    <td>
                        <label>
                            <input id="wd-text-entry" type="checkbox"/>
                            Text Entry
                        </label><br/>
                        <label>
                            <input id="wd-website-url" type="checkbox"/>
                            Website URL
                        </label><br/>
                        <label>
                            <input id="wd-media-recordings" type="checkbox"/>
                            Media Recordings
                        </label><br/>
                        <label>
                            <input id="wd-student-annotation" type="checkbox"/>
                            Student Annotation
                        </label><br/>
                        <label>
                            <input id="wd-file-upload" type="checkbox"/>
                            File Uploads
                        </label><br/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign to</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" value={"Everyone"}/>
                    </td>
                </tr>

                <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-due-date">Due</label>
                </td>
                <td>
                    <input id="wd-due-date" type="date"/>
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-available-from">Available From</label>
                </td>
                <td>
                    <input id="wd-available-from" type="date"/>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-available-until">Available Until</label>
                </td>
                <td>
                    <input id="wd-available-until" type="date"/>
                </td>
            </tr>
        </table>

    <br/>
    <button>Save</button>
    <button>Cancel</button>
</div>
)
    ;
}

