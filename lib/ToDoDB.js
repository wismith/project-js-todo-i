
let TodoList = require('./TodoList');

class TodoDB {
  constructor(dbName) {
    const Database = require('better-sqlite3');
    this.db = new Database(dbName);
  }

  loadTodoList() {
    let rowItemList = this.db.prepare('SELECT * FROM tasks WHERE tasks.todo_list_id = ?').all(1);
    return TodoList.createFromRowItemList(rowItemList);
  }

  saveTodoList(todoList) {
    this.db.prepare('DELETE FROM tasks WHERE tasks.todo_list_id = ?').all(1);
    for (let task of todoList.tasks) {
      this.db.prepare('INSERT INTO tasks (description, isComplete, isImportant, todo_list_id) VALUES (?, ?, ?, 1) ').get(task.description, task.isComplete, task.isImportant);
    }
  }
}

module.exports = TodoDB;
