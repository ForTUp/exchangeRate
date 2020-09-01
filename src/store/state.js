// state.js
const state = {
  todoList: JSON.parse(localStorage.getItem('todoList')) || []
}

export default state