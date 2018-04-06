import controller from '/js/controller.mjs';

const todos = document.getElementById('todos');
const view = {};
view.appendTodo = (todo) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'todo-view');
  li.setAttribute('id', `todo_${todo.id}`);
  const div = document.createElement('div');
  const inputEl = document.createElement('input');
  inputEl.setAttribute("type", "checkbox");
  inputEl.setAttribute("id", `checkbox_${todo.id}`);
  inputEl.setAttribute("data-todo-id", todo.id);
  inputEl.addEventListener("click", controller.toggle);
  inputEl.setAttribute("checked", todo.done);
  const labelEl = document.createElement('label');
  labelEl.setAttribute("for", `checkbox_${todo.id}`)
  labelEl.setAttribute("class", "checkbox-label")
  labelEl.setAttribute("id", `label_${todo.id}`)
  labelEl.style = todo.done && 'text-decoration: line-through';
  labelEl.innerText = todo.content;
  const updateButton = document.createElement('input');
  updateButton.setAttribute('type', "button");
  updateButton.setAttribute('value', "update");
  updateButton.setAttribute('data-todo-id', todo.id);
  updateButton.addEventListener('click', controller.openPrompt);
  const deleteButton = document.createElement('input');
  deleteButton.setAttribute('type', "button");
  deleteButton.setAttribute('value', "delete");
  deleteButton.setAttribute('data-todo-id', todo.id);
  deleteButton.addEventListener('click', controller.openConfirm);
  div.appendChild(inputEl);
  div.appendChild(labelEl);
  div.appendChild(updateButton);
  div.appendChild(deleteButton);
  li.appendChild(div);
  todos.appendChild(li);
};

view.toggleLabel = (label, done) => {
  done ? label.setAttribute('style', 'text-decoration: line-through;') : label.removeAttribute('style');
};

view.updateLabel = (label, content) => {
  label.innerText = content;
};

view.remove = (id) => {
  const item = document.getElementById(`todo_${id}`);
  item.parentElement.removeChild(item);
};

export default view;
