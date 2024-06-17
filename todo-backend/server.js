const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let todos = [];

// Получение всех задач
app.get('/api/todos', (res) => {
    res.json(todos);
});

// Добавление новой задачи с уникальным идентификатором
app.post('/api/todos', (req, res) => {
    const todo = {
        id: uuidv4(),
        text: req.body.text
    };
    todos.push(todo);
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
