'use strict';
const todo = {};
document.onreadystatechange = async () => {
  if (document.readyState === 'complete') {
    const { default: controller } = await import('/js/controller.mjs');
    await controller.init();
  }
};

export default todo;
