
let Task = require('./Task');

class TodoList {
  static createFromString(todoListString) {
    let lines = todoListString.trim().split('\n');
    let tasks = lines.map(line => Task.createFromString(line));

    return new TodoList(tasks);
  }

  constructor(tasks = []) {
    this.tasks = tasks;
  }

  length() {
    return this.tasks.length;
  }

  taskAt(i) {
    return this.tasks[i];
  }

  add(task) {
    this.tasks.push(task);
    return this;
  }

  removeTaskAt(i) {
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
  }

}

module.exports = TodoList;
