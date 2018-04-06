const assert = require('assert');
const test = require('eater/runner').test;
const agreedServer = require('agreed-server');
const bodyParser = require('body-parser');
const express = require('express');
const todoRouter = require('../../server/todo-router');
const fetch = require('node-fetch');

test('check todo instance', () => {
  global.todo = {};
  require('../../public/js/model');
  assert(global.todo.model)
});

test('check todo create', () => {
  const port = 13242;
  const app = express();
  const server = require('http').Server(app);
  app.use(bodyParser.json());
  app.use('/todos', todoRouter);
  server.listen(port);

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.create('hogehogehoge');
    const expect = {
      id: 0,
      content: 'hogehogehoge',
      done: false,
    };
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo getTodos', () => {
  const port = 13242;
  const app = express();
  const server = require('http').Server(app);
  app.use(bodyParser.json());
  app.use('/todos', todoRouter);
  server.listen(port);

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.getTodos();
    const expect = { todos: [] };
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo done', () => {
  const port = 13242;
  const app = express();
  const server = require('http').Server(app);
  app.use(bodyParser.json());
  app.use('/todos', todoRouter);
  server.listen(port);

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    await global.todo.model.create('hogehogehoge');
    const result = await global.todo.model.done(0, true);
    const expect = {
      id: 0,
      content: 'hogehogehoge',
      done: true,
    };
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo update', () => {
  const port = 13242;
  const app = express();
  const server = require('http').Server(app);
  app.use(bodyParser.json());
  app.use('/todos', todoRouter);
  server.listen(port);

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    await global.todo.model.create('hogehogehoge');
    const result = await global.todo.model.updateContent(0, 'test');
    const expect = {
      id: 0,
      content: 'test',
      done: false,
    };
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo remove', () => {
  const port = 13242;
  const app = express();
  const server = require('http').Server(app);
  app.use(bodyParser.json());
  app.use('/todos', todoRouter);
  server.listen(port);

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    await global.todo.model.create('hogehogehoge');
    const result = await global.todo.model.remove(0);
    const expect = true;
    assert.strictEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

