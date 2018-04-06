import model from '/js/model.mjs';

const todoFormEl = document.getElementById('todo-form');
todoFormEl.onsubmit = async (e) => {
  e.preventDefault();
  const content = e.target[0].value;
  const result = await model.create(content);
  const { default: view } = await import('/js/view.mjs');
  view.appendTodo(result);
  e.target[0].value = '';
};

const controller = {};
controller.init = async () => {
  const { default: view } = await import('/js/view.mjs');
  const { todos } = await model.getTodos();
  todos.forEach((todo) => {
    view.appendTodo(todo);
  });
};

controller.toggle = async (e) => {
  const { default: view } = await import('/js/view.mjs');
  const id = e.target.getAttribute('data-todo-id');
  const label = document.getElementById(`label_${id}`);
  const done = e.target.checked;
  const result = await model.done(id, done);
  view.toggleLabel(label, result.done);
};

controller.openPrompt = async (e) => {
  const { default: view } = await import('/js/view.mjs');
  const id = e.target.getAttribute('data-todo-id');
  const label = document.getElementById(`label_${id}`);
  const content = label.innerText;
  const newContent = prompt('change content', content);
  const result = await model.updateContent(id, newContent, false);
  view.updateLabel(label, result.content);
};

controller.openConfirm = async (e) => {
  const { default: view } = await import('/js/view.mjs');
  const id = e.target.getAttribute('data-todo-id');
  const label = document.getElementById(`label_${id}`);
  const content = label.innerText;
  const yes = confirm(`remove this todo? ${content}`);
  if (yes) {
    const result = await model.remove(id);
    view.remove(id);
  }
};

export default controller;
