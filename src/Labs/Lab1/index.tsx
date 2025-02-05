export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>

            {/* Heading Tags */}
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and subsections. Each section is
                usually prefaced with a short title or heading that attempts to summarize the topic of the
                section it precedes. For instance this paragraph is preceded by the heading Heading Tags.
                The font of the section headings are usually larger and bolder than their subsection
                headings. This document uses headings to introduce topics such as HTML Documents, HTML
                Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it
                renders in a browser as large headings. There are 6 heading tags for different sizes: h1,
                h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
            </div>

            {/* Paragraph Tag */}
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">This is the first paragraph.</p>
                <p id="wd-p-2">This is the second paragraph.</p>
                <p id="wd-p-3">This is the third paragraph.</p>
            </div>

            {/* Ordered List Tag */}
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                <h5>My Favorite Recipe</h5>
                <ol id="wd-your-favorite-recipe">
                    <li>Heat the milk until bubbles form at the edges.</li>
                    <li>Mix the sugar, cornstarch, and salt together in a small bowl.</li>
                    <li>Add the sugar mixture to the milk, a little at a time, stirring until thick.</li>
                    <li>Remove the pudding from the heat, then stir in the butter and vanilla.</li>
                </ol>
            </div>

            {/* Unordered List Tag */}
            <div id="wd-unordered-lists">
                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                </ul>
                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                    <li>Adachi to Shimamura</li>
                    <li>Sword Art Online</li>
                </ul>
            </div>

            {/* Table Tags */}
            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                    <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Q1</td>
                        <td>HTML</td>
                        <td>2/3/21</td>
                        <td>85</td>
                    </tr>
                    <tr>
                        <td>Q2</td>
                        <td>CSS</td>
                        <td>2/10/21</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q3</td>
                        <td>JavaScript</td>
                        <td>2/17/21</td>
                        <td>95</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3}>Average</td>
                        <td>90</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            {/* Image Tag */}
            <div id="wd-images">
                <h4>Image Tag</h4>
                <p>Loading an image from the internet:</p>
                <img
                    id="wd-starship"
                    width="400px"
                    src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                    alt="Starship"
                />
                <p>Loading a local image:</p>
                <img id="wd-teslabot" src="images/teslabot.jpg" height="200px" alt="Tesla Bot" />
            </div>

            {/* Form Elements */}
            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input placeholder="jdoe" id="wd-text-fields-username" />
                    <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" value="123@#$asd" id="wd-text-fields-password" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" />
                    <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" />
                    <h4>Other HTML field types</h4>

                    <label htmlFor="wd-text-fields-email"> Email: </label>
                    <input type="email"
                           placeholder="jdoe@somewhere.com"
                           id="wd-text-fields-email"/><br/>

                    <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
                    <input type="number"
                           value="100000"
                           placeholder="1000"
                           id="wd-text-fields-salary-start"/><br/>

                    <label htmlFor="wd-text-fields-rating"> Rating: </label>
                    <input type="range"
                           value="4"
                           max="5"
                           placeholder="Doe"
                           id="wd-text-fields-rating"/><br/>

                    <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                    <input type="date"
                           value="2000-01-21"
                           id="wd-text-fields-dob"/><br/>
                </form>
            </div>

            {/* Text Box */}
            <div id="wd-text-box">
                <h5>Text boxes</h5>
                <label>Biography:</label><br/>
                <textarea id="wd-textarea" cols={30} rows={10}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>

            </div>

            {/* Button */}
            <div id="wd-buttons">
                <h5 id="wd-buttons">Buttons</h5>
                <button type="button"
                        onClick={() => alert("Life is Good!")}
                        id="wd-all-good">
                    Hello World!
                </button>

            </div>

            {/* Radio Button */}
            <div id="wd-radio">
                <h5 id="wd-radio-buttons">Radio buttons</h5>

                <label>Favorite movie genre:</label><br/>

                <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
                <label htmlFor="wd-radio-comedy">Comedy</label><br/>

                <input type="radio" name="radio-genre" id="wd-radio-drama"/>
                <label htmlFor="wd-radio-drama">Drama</label><br/>

                <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
                <label htmlFor="wd-radio-scifi">Science Fiction</label><br/>

                <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
                <label htmlFor="wd-radio-fantasy">Fantasy</label>
            </div>

            {/* Check Box */}
            <div id="wd-check-box">
                <h5 id="wd-checkboxes">Checkboxes</h5>
                <label>Favorite movie genre:</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
                <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
                <label htmlFor="wd-chkbox-drama">Drama</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
                <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
            </div>

            {/* Drop Down */}
            <div id="wd-drop-down">
                <h4 id="wd-dropdowns">Dropdowns</h4>

                <h5>Select one</h5>
                <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
                <select id="wd-select-one-genre">
                    <option value="COMEDY">Comedy</option>
                    <option value="DRAMA">Drama</option>
                    <option selected value="SCIFI">
                        Science Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                </select>

                <h5>Select many</h5>
                <label  htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
                <select multiple id="wd-select-many-genre">
                    <option value="COMEDY" selected> Comedy          </option>
                    <option value="DRAMA">           Drama           </option>
                    <option value="SCIFI"  selected> Science Fiction </option>
                    <option value="FANTASY">         Fantasy         </option>
                </select>
            </div>

            {/* Anchor Tag */}
            <div id="wd-links">
                <h4>Anchor tag</h4>
                Please
                <a href="https://www.lipsum.com" id="wd-lipsum">click here</a>
                to get dummy text<br/>
                Please
                <a href="https://github.com/Yyyhn1998/kanbas-react-web-app" id="wd-github">click here</a>
                to view my GitHub repository
            </div>
        </div>
);
}
