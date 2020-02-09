let Task = require('./Task');

class PositionInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositionInputError';
  }
}

function getPositionOrError(input) {
  let position = Number(input);

  if (!Number.isInteger(position)) {
    throw new PositionInputError(`Invalid position, received '${position}`);
  }

  return position;
}

class TodoListController {
  constructor(todoFile) {
    this.todoFile = todoFile;
    this.todoList = todoFile.loadTodoList();
  }

  show() {
    for (let i = 0; i < this.todoList.length(); i++) {
      let pos = i + 1;
      let task = this.todoList.taskAt(i);

      console.log(`${pos}. ${task.toString()}`);
    }
  }

  add(description) {
    this.todoList.add(new Task(description, false));

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

  toggle(positionInput) {
    let pos = getPositionOrError(positionInput);

    this.todoList.toggleTaskCompleteAt(pos - 1);

    this.todoFile.saveTodoList(this.todoList);
  }
}

module.exports = TodoListController;
