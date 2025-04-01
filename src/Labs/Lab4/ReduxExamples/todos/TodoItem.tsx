import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>{todo.title}</div>
            <div>
                <Button
                    variant="danger"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                    className="me-2"
                >
                    Delete
                </Button>
                <Button
                    variant="primary"
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                >
                    Edit
                </Button>
            </div>
        </ListGroup.Item>
    );
}
