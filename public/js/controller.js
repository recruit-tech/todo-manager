'use strict';
(function(global) {
  const todoFormEl = document.getElementById('todo-form');
  todoFormEl.onsubmit = async (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    const result = await global.todo.model.create(content);
    global.todo.view.appendTodo(result);
    e.target[0].value = '';
  };

  global.todo.controller = {};
  global.todo.controller.init = async () => {
    const { todos } = await global.todo.model.getTodos();
    todos.forEach((todo) => {
      global.todo.view.appendTodo(todo);
    });
  };

  global.todo.controller.toggle = async (e) => {
    const id = e.getAttribute('data-todo-id');
    const label = document.getElementById(`label_${id}`);
    const content = label.innerText;
    const done = e.checked;
    const result = await global.todo.model.done(id, content, done);
    global.todo.view.toggleLabel(label, result.done);
  };

  global.todo.controller.openPrompt = async (e) => {
    const id = e.getAttribute('data-todo-id');
    const label = document.getElementById(`label_${id}`);
    const content = label.innerText;
    const newContent = prompt('change content', content);
    const result = await global.todo.model.updateContent(id, newContent, false);
    global.todo.view.updateLabel(label, result.content);
  };

  global.todo.controller.openConfirm = async (e) => {
    const id = e.getAttribute('data-todo-id');
    const label = document.getElementById(`label_${id}`);
    const content = label.innerText;
    const yes = confirm(`remove this todo? ${content}`);
    if (yes) {
      const result = await global.todo.model.remove(id);
      global.todo.view.remove(id);
    }
  };

}(window));
