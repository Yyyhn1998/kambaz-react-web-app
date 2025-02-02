import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { Route, Routes } from "react-router";
import { FaUser } from "react-icons/fa";

export default function Account() {
    return (
        <div id="wd-account">
            <h2 className="text-danger">
                <FaUser className="me-4 fs-4 mb-1"/>
                Account
            </h2>
            <hr/>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <AccountNavigation/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Signin" element={<Signin />} />
                        <Route path="Signup" element={<Signup />} />
                        <Route path="Profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}


