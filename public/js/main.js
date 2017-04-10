'use strict';
document.onreadystatechange = async () => {
  if (document.readyState === 'interactive') {
    await window.todo.controller.init();
  }
};
window.todo = window.todo || {};
