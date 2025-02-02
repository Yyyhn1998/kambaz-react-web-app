import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
    return (
        <div className="float-end d-flex align-items-center" style={{ paddingTop: "2px" }}>
            <div style={{ marginTop: "-2px" }}>
                <GreenCheckmark />
            </div>
            <BsPlus className="fs-4 mx-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
