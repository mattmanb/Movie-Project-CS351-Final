import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditTodo = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({
        movie: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:4000/todos/${id}`)
            .then(response => {
                const { movie } = response.data;
                setMovie({
                    movie
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    const onDelete = (e) => {
        axios.post(`http://localhost:4000/todos/delete/${id}`)
            .then(res =>  {
                console.log(res.data);
                window.location = '/';
            });
    }
    

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            todo_description: e.target.value
        });
    };

    const onChangeTodoResponsible = (e) => {
        setTodo({
            ...todo,
            todo_responsible: e.target.value
        });
    };

    const onChangeTodoPriority = (e) => {
        setTodo({
            ...todo,
            todo_priority: e.target.value
        });
    };

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            todo_completed: e.target.checked
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todo_description: todo.todo_description,
            todo_responsible: todo.todo_responsible,
            todo_priority: todo.todo_priority,
            todo_completed: todo.todo_completed
        };
        console.log(obj);
        axios.post(`http://localhost:4000/todos/update/${id}`, obj)
            .then(res => {
                console.log(res.data);
                window.location = '/';
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3 align="center">Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={todo.todo_description}
                        onChange={onChangeTodoDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={todo.todo_responsible}
                        onChange={onChangeTodoResponsible}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={todo.todo_priority === 'Low'}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={todo.todo_priority === 'Medium'}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={todo.todo_priority === 'High'}
                            onChange={onChangeTodoPriority}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        id="completedCheckbox"
                        type="checkbox"
                        name="completedCheckbox"
                        onChange={onChangeTodoCompleted}
                        checked={todo.todo_completed}
                    />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default EditTodo;