let Task = require('./Task');

function getPositionOrError(input) {
  let position = Number(input);

  if (!Number.isInteger(position)) {
    // throw new PositionInputError
  }
}

class TodoListController {

  constructor(todoFile) {
    this.todoFile = todoFile;
    this.todoList = todoFile.loadTodoList();
  }

  validMethods() {
    return ['show', 'add', 'remove', 'complete', 'toggleComplete', 'toggleImportant'];
  }

  isValidMethod(name) {
    return this.validMethods().includes(name);
  }

  dispatch(command, arg) {
    if (typeof command !== 'string') {
      // Throw error
    }

    if (!this.isValidMethod(command)) {
      // Throw error
    }

    this[command](arg);
  }

  show() {
    for (let i = 0; i < this.todoList.length(); i++) {
      let pos = i + 1;
      let task = this.taskAt(i);

      console.log(`${pos}. ${task.toString()}`);
    }
  }

  add(description, important) {
    this.todoList.add(new Task(description, false, important));
    this.todoFile.saveTodoList(this.todoList);
  }

  remove(positionInput) {
    let pos = getPositionOrError(positionInput);

    this.todoList.removeTaskAt(pos - 1);
    this.todoFile.saveTodoList(this.todoList);
  }

  complete(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.markTaskCompleteAt(pos - 1);
    this.todoFile.saveTodoList(this.todoList);
  }

  toggleComplete(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.toggleTaskCompleteAt(pos - 1);
    this.todoFile.saveTodoList(this.todoList);
  }

  toggleImportant(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.toggleTaskImportantAt(pos - 1);
    this.todoFile.saveTodoList(this.todoList);
  }
}

module.exports = TodoListController;
