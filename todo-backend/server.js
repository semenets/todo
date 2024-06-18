const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let todos = [];

app.get('/api/todos', (req, res) => {
	try {
		console.log('GET /api/todos called');
		res.json(todos);
	} catch (error) {
		console.error('Error in GET /api/todos:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.post('/api/todos', (req, res) => {
	try {
		console.log('POST /api/todos called with data:', req.body);
		const todo = {
			id: uuidv4(),
			text: req.body.text
		};
		todos.push(todo);
		res.json(todo);
	} catch (error) {
		console.error('Error in POST /api/todos:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.delete('/api/todos/:id', (req, res) => {
	try {
		console.log(`DELETE /api/todos/${req.params.id} called`);
		todos = todos.filter(todo => todo.id !== req.params.id);
		res.json({ message: 'Todo deleted' });
	} catch (error) {
		console.error(`Error in DELETE /api/todos/${req.params.id}:`, error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
