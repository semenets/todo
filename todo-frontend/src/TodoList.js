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
			if (newTodo.trim() === '') {
				alert('Please enter a todo item.');
				return;
			}
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
			<div className="todo">
				<h2>Things to do:</h2>
				<form onSubmit={handleSubmit}>
					<input name="input-text" className="input-text" maxLength="30" type="text" value={newTodo} onChange={handleChange} />
					<button className="add-button" type="submit">Add</button>
				</form>
				<ul className="list">
						{todos.map(todo => (
							<li key={todo.id}>
								{todo.text}
								<button onClick={() => handleDelete(todo.id)} className="delete-button">
									<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#fff"/>
									</svg>
								</button>
							</li>
						))}
				</ul>
			</div>
    );
};

export default TodoList;
