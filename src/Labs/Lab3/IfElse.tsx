export default function IfElse() {
    const true1 = true, false1 = false;

    return (
        <div id="wd-if-else">
            <h4>If Else</h4>
            {true1 && <p>true1</p>}  {/* 仅当 true1 为 true 时渲染 */}
            {!false1 ? <p>!false1</p> : <p>false1</p>} <hr /> {/* 条件渲染 */}
        </div>
    );
}