import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
export default function Labs() {
    return (
        <Provider store={store}>
        <div id="wd-lab-page">
            <div id="labs-container">
            <h1>Labs</h1>
            <h3>Haoning Yin</h3>
            <h3>CS5610 SEC01</h3>
            code repository:<br/>
                <div id="wd-github">
            <a href="https://github.com/Yyyhn1998/kambaz-react-web-app" id="wd-github">click here</a>
            to view my GitHub repository
                </div>
            <TOC/>
            <Routes>
                <Route path="/" element={<Navigate to="Lab1"/>}/>
                <Route path="Lab1" element={<Lab1/>}/>
                <Route path="Lab2/*" element={<Lab2/>}/>
                <Route path="Lab3/*" element={<Lab3 />} />
                <Route path="Lab4/*" element={<Lab4 />} />
                <Route path="Lab5/*" element={<Lab5 />} />
            </Routes>
            </div>
        </div>
        </Provider>
    );
}

