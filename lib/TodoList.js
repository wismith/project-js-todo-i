class TaskIndexError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskIndexError';
  }
}

// Helper to ensure we don't pass in invalid indexes
function checkTaskIndex(todoList, index) {
  if (!(index >= 0 && index < todoList.length())) {
    throw new TaskIndexError(`Invalid task index '${index}', list contains ${todoList.length()} tasks.`);
  }
}

let Task = require('./Task');

class TodoList {
  static createFromString(todoListString) {
    let lines = todoListString.trim().split('\n');

    let tasks = lines.map(function(line) {
      return Task.createFromString(line);
    });

    return new TodoList(tasks);
  }

  constructor(tasks = []) {
    this.tasks = tasks;
  }

  length() {
    return this.tasks.length;
  }

  taskAt(i) {
    checkTaskIndex(this, i);

    return this.tasks[i];
  }

  add(task) {
    this.tasks.push(task);

    return this;
  }

  removeTaskAt(i) {
    checkTaskIndex(this, i);

    // splice returns an array of removed items
    let removedTasks = this.tasks.splice(i, 1);

    return removedTasks[0];
  }
}

module.exports = TodoList;
