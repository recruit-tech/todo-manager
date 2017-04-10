'use strict';

const express = require('express');
const router = express.Router();
const todos = [];

router.post('/', (req, res, next) => {
  const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
  const item = {
    id: id,
    content: req.body.content,
    done: false,
  };
  todos.push(item);
  return res.status(201).send(item);
});

router.get('/', (req, res, next) => {
  return res.send({ todos: todos });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);
  const content = req.body.content;
  const done = req.body.done;
  if (content) {
    todo.content = content;
    return res.status(201).send(todo);
  } else {
    todo.done = done;
    return res.status(201).send(todo);
  }
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const todo = todos.splice(index, 1);
  return res.status(204).send('done');
});

module.exports = router;
