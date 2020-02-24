
class TaskIndexError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskIndexError';
  }
}

function checkTaskIndex(todoList, index) {
  if (!(index >= 0 && index < todoList.length())) {
    throw new TaskIndexError(`Invalid task index '${index}', list contains ${todoList.length()} tasks.`);
  }
}

let Task = require('./Task');

class TodoList {
  static createFromRowItemList(rowItemList) {
    let tasks = rowItemList.map(t => Task.createFromRowItem(t));
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
    let removedTasks = this.tasks.splice(i, 1);
    return removedTasks[0];
  }

  markTaskCompleteAt(i) {
    this.taskAt(i).markComplete();
    return this;
  }

  markTaskIncompleteAt(i) {
    this.taskAt(i).markIncomplete();
    return this;
  }

  toggleTaskCompleteAt(i) {
    this.taskAt(i).toggleComplete();
    return this;
  }

  markTaskImportantAt(i) {
    this.taskAt(i).markImportant();
    return this;
  }

  markTaskUnimportantAt(i) {
    this.taskAt(i).markUnimportant();
    return this;
  }

  toggleTaskImportantAt(i) {
    this.taskAt(i).toggleImportant();
    return this;
  }
}

module.exports = TodoList;
