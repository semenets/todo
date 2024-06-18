import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
      axios.get('http://localhost:5000/api/todos')
				.then(res => setTodos(res.data))
				.catch(err => console.error('Error fetching todos:', err));
    }, []);

    const handleChange = (e) => {
      setNewTodo(e.target.value);
    };

    const handleSubmit = (e) => {
			e.preventDefault();
			if (todos.some(todo => todo.text === newTodo)) {
				alert('This todo item already exists.');
				return;
			}
			const todo = { id: uuidv4(), text: newTodo };
			axios.post('http://localhost:5000/api/todos', todo)
				.then(res => {
						setTodos([...todos, res.data]);
						setNewTodo('');
				})
				.catch(err => console.error('Error adding todo:', err));
    };

    const handleDelete = (id) => {
      axios.delete(`http://localhost:5000/api/todos/${id}`)
				.then(res => {
					setTodos(todos.filter(todo => todo.id !== id));
				})
				.catch(err => console.error('Error deleting todo:', err));
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
							<li key={todo.id}>
								{todo.text}
								<button onClick={() => handleDelete(todo.id)}>Delete</button>
							</li>
						))}
				</ul>
			</div>
    );
};

export default TodoList;
