import ListGroup from "react-bootstrap/ListGroup";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { todos } = useSelector((state: any) => state.todosReducer);

    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <ListGroup>
                <TodoForm />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
