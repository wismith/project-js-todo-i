let Task = require('./Task');

class PositionInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositionInputError';
  }
}

class MissingCommandError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingCommandError';
  }
}

class UnknownCommandError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownCommandError';
  }
}

function getPositionOrError(input) {
  let position = Number(input);

  if (!Number.isInteger(position)) {
    throw new PositionInputError(`Invalid position, received '${input}'`);
  }

  return position;
}

class TodoListController {
  constructor(todoDB) {
    this.todoDB = todoDB;
    this.todoList = todoDB.loadTodoList();
  }

  validMethods() {
    return ['show', 'add', 'remove', 'complete', 'toggleComplete', 'toggleImportant'];
  }

  isValidMethod(name) {
    return this.validMethods().includes(name);
  }

  dispatch(command, arg) {
    if (typeof command !== 'string') {
      throw new MissingCommandError('You must supply a commadn to run.');
    }

    if (!this.isValidMethod(command)) {
      throw new UnknownCommandError(`Unknown command: '${command}'`);
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

  add(description) {
    this.todoList.add(new Task(description, false, false));
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
