import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { Route, Routes } from "react-router";
import { FaUser } from "react-icons/fa";
import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Users from "./Users.tsx";

export default function Account() {
    // eslint-disable-next-line
    const { currentUser } = useSelector((state: any) => state.accountReducer);

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
                        <Route path="/" element={<Navigate to={ currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" }/>}/>
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Users" element={<Users />} />
                        <Route path="/Users/:uid" element={<Users />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="Signin" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}


