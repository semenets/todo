import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Импортируем uuidv4 из библиотеки uuid

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/todos')
            .then(res => setTodos(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { id: uuidv4(), text: newTodo }; // Генерируем уникальный идентификатор для новой задачи на клиенте
        axios.post('http://localhost:5000/api/todos', todo)
            .then(res => {
                setTodos([...todos, res.data]);
                setNewTodo('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTodo} onChange={handleChange} />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} id={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
