import { useEffect, useState } from "react";
import * as client from "./client";
import {FormControl} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import {FaTrash} from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
export default function WorkingWithObjectsAsynchronously() {
    // eslint-disable-next-line
    const [assignment, setAssignment] = useState<any>({});
    const fetchAssignment = async () => {
        const assignment = await client.fetchAssignment();
        setAssignment(assignment);
    };
    const updateTitle = async (title: string) => {
        const updatedAssignment = await client.updateTitle(title);
        setAssignment(updatedAssignment);
    };

    useEffect(() => {
        fetchAssignment();
    }, []);

    const [errorMessage, setErrorMessage] = useState(null);
// eslint-disable-next-line
    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };
    useEffect(() => {
        fetchTodos();
    }, []);
    // eslint-disable-next-line
    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };
    const createTodo = async () => {
        const todos = await client.createTodo();
        setTodos(todos);
    };
    const postTodo = async () => {
        const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false, });
        setTodos([...todos, newTodo]);
    };
    // eslint-disable-next-line
    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }  };
    // eslint-disable-next-line
    const editTodo = (todo: any) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, editing: true } : t );
        setTodos(updatedTodos);
    };
    // eslint-disable-next-line
    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            // eslint-disable-next-line
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    }






    return (
        <div id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            <h4>Assignment</h4>
            <FormControl defaultValue={assignment.title} className="mb-2"
                         onChange={(e) => setAssignment({...assignment, title: e.target.value})}/>
            <FormControl rows={3} defaultValue={assignment.description} className="mb-2"
                         onChange={(e) => setAssignment({
                             ...assignment,
                             description: e.target.value
                         })}/>
            <FormControl type="date" className="mb-2" defaultValue={assignment.due}
                         onChange={(e) => setAssignment({...assignment, due: e.target.value})}/>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="wd-completed"
                       defaultChecked={assignment.completed}
                       onChange={(e) => setAssignment({
                           ...assignment,
                           completed: e.target.checked
                       })}/>
                <label className="form-check-label" htmlFor="wd-completed"> Completed </label>
            </div>
            <button className="btn btn-primary me-2" onClick={() => updateTitle(assignment.title)}>
                Update Title
            </button>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
            <hr/>
            {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
            <h4>Todos
                <FaPlusCircle onClick={createTodo} className="text-success float-end fs-3"
                              id="wd-create-todo" />
                <FaPlusCircle onClick={postTodo}   className="text-primary float-end fs-3 me-3" id="wd-post-todo"   />
            </h4>
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id} className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            defaultChecked={todo.completed}
                            className="form-check-input me-2"
                            onChange={(e) =>
                                updateTodo({ ...todo, completed: e.target.checked })
                            }
                        />
                        {todo.editing ? (
                            <FormControl
                                className="w-50"
                                defaultValue={todo.title}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        ) : (
                            <span
                                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                            >
          {todo.title}
        </span>
                        )}
                        <div className="ms-auto">
                            <FaPencil
                                onClick={() => editTodo(todo)}
                                className="text-primary me-2 fs-5"
                                id="wd-edit-todo"
                            />
                            <FaTrash
                                onClick={() => removeTodo(todo)}
                                className="text-danger me-2 fs-5"
                                id="wd-remove-todo"
                            />
                            <TiDelete
                                onClick={() => deleteTodo(todo)}
                                className="text-danger fs-4"
                                id="wd-delete-todo"
                            />
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <hr/>

        </div>
    );
}
