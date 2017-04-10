'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./server/todo-router');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('./public/'));
app.use('/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});
