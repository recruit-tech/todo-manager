const assert = require('assert');
const test = require('eater/runner').test;
require('agreed-core/register');
const agreedServer = require('agreed-server');
const fetch = require('node-fetch');

test('check todo instance', () => {
  global.todo = {};
  require('../../public/js/model');
  assert(global.todo.model)
});

test('check todo create', () => {
  const port = 13242;
  const server = agreedServer({
    path: './spec/agreed/entry.js',
    port,
  });

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.create('hogehogehoge');
    const expect = require('../../spec/agreed/todos/post.json5').response.values;
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo getTodos', () => {
  const port = 13242;
  const server = agreedServer({
    path: './spec/agreed/entry.js',
    port,
  });

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.getTodos();
    const expect = require('../../spec/agreed/todos/get.json5').response.values;
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo done', () => {
  const port = 13242;
  const server = agreedServer({
    path: './spec/agreed/entry.js',
    port,
  });

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.done(1, true);
    const expect = require('../../spec/agreed/todos/done.json5').response.values;
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo update', () => {
  const port = 13242;
  const server = agreedServer({
    path: './spec/agreed/entry.js',
    port,
  });

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.updateContent(1, 'test');
    const expect = require('../../spec/agreed/todos/update.json5').response.values;
    assert.deepEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

test('check todo remove', () => {
  const port = 13242;
  const server = agreedServer({
    path: './spec/agreed/entry.js',
    port,
  });

  server.on('listening', async () => {
    global.todo = {};
    global.fetch = fetch;
    global.TODO_URL = `http://127.0.0.1:${port}/todos`;
    require('../../public/js/model');
    const result = await global.todo.model.remove(1);
    const expect = true;
    assert.strictEqual(result, expect);
    process.nextTick(() => {
      server.close();
    });
  });
});

