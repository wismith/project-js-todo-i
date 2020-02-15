
let TodoList = require('./TodoList');

class TodoDB {
  constructor(dbName) {
    const Database = require('better-sqlite3');
    this.db = new Database(dbName);
  }

  loadTodoList() {
    let rowItemList = this.db.prepare('SELECT * FROM tasks WHERE tasks.todo_list_id = ?').all(1);
    for (let rowItem of rowItemList) {
      rowItem.isComplete = (rowItem.isComplete === 1);
      rowItem.isImportant = (rowItem.isImportant === 1);
    }
    return TodoList.createFromRowItemList(rowItemList);
  }

  saveTodoList(todoList) {
    this.db.prepare('DELETE FROM tasks WHERE tasks.todo_list_id = 1').run();
    for (let task of todoList.tasks) {
      task.isComplete = (task.isComplete ? 1 : 0);
      task.isImportant = (task.isImportant ? 1 : 0);
    }
    const insert = this.db.prepare('INSERT INTO tasks (description, isComplete, isImportant, todo_list_id) VALUES (@description, @isComplete, @isImportant, 1)');

    const insertList = this.db.transaction((tasks) => {
      for (let task of tasks) {
        insert.run(task.attributes());
      }
    });
    insertList(todoList.tasks);
  }
}

module.exports = TodoDB;
