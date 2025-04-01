import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    // eslint-disable-next-line
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroup.Item>
            <div className="d-flex align-items-center justify-content-between">
                <FormControl
                    value={todo.title}
                    onChange={(e) =>
                        dispatch(setTodo({ ...todo, title: e.target.value }))
                    }
                    placeholder="Enter a task"
                    className="me-3"
                />
                <div>
                    <Button
                        variant="warning"
                        onClick={() => dispatch(updateTodo(todo))}
                        id="wd-update-todo-click"
                        className="me-2"
                    >
                        Update
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => dispatch(addTodo(todo))}
                        id="wd-add-todo-click"
                    >
                        Add
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}
