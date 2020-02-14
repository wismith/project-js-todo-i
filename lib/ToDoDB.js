
let TodoList = require('./TodoList');

class TodoDB {
  constructor(dbName) {
    const Database = require('better-sqlite3');
    this.db = new Database(dbName);
  }

  loadTodoList() {
    let taskList = this.db.prepare('SELECT * FROM tasks WHERE tasks.todo_list_id = ?').get(1);
    return taskList;
  }

  saveTodoList(todoList) {

  }
}

module.exports = TodoDB;
