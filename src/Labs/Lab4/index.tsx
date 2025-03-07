import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <div id="wd-lab2">
            <h2>Lab 4 -Maintaining State in React Applications</h2>

            <div id="wd-lab4-handiling-click-event">
                <ClickEvent/>
            </div>
            <div id="wd-lab4-passing-date-on-event">
                <PassingDataOnEvent/>
            </div>
            <PassingFunctions theFunction={sayHello}/>
            <div id="wd-lab4-event-object">
                <EventObject/>
            </div>
            <div id="wd-lab4-counter">
                <Counter/>
            </div>
            <div id="wd-lab4-boolean-state-variables">
                <BooleanStateVariables/>
            </div>
            <div id="wd-lab4-string-state-variables">
                <StringStateVariables/>
            </div>
            <div id="wd-lab4-date-state-variables">
                <DateStateVariable/>
            </div>
            <div id="wd-lab4-object-state-variables">
                <ObjectStateVariable/>
            </div>
            <div id="wd-lab4-array-state-variables">
                <ArrayStateVariable/>
            </div>
            <div id="wd-lab4-parent-state-variables">
                <ParentStateComponent/>
            </div>
            <ReduxExamples/>
        </div>
    )
        ;
}
