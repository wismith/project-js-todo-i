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
      throw new MissingCommandError('You must supply a command to run.');
    }

    if (!this.isValidMethod(command)) {
      throw new UnknownCommandError(`Unknown command: '${command}'`);
    }

    this[command](arg);
  }

  show() {
    console.log();
    console.log('  Your To-Do List:');
    console.log('  -------------------------------');
    for (let i = 0; i < this.todoList.length(); i++) {
      let pos = i + 1;
      let task = this.todoList.taskAt(i);

      console.log(`  ${pos}. ${task.toString()}`);
    }
    console.log();
  }

  add(description) {
    this.todoList.add(new Task(undefined, description, false, false));
    this.show();
    const insert = this.todoDB.db.prepare('INSERT INTO tasks (description, isComplete, isImportant, todo_list_id) VALUES (@task, 0, 0, 1)');
    insert.run({ task: description });
  }

  remove(positionInput) {
    let pos = getPositionOrError(positionInput);
    let remove = this.todoDB.db.prepare('DELETE FROM tasks WHERE id = @toRemove');
    remove.run({ toRemove: this.todoList.removeTaskAt(pos - 1).id });
    this.show();
  }

  complete(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.markTaskCompleteAt(pos - 1);
    this.show();
    let complete = this.todoDB.db.prepare('UPDATE tasks SET isComplete = 1 WHERE id = @toComplete');
    complete.run({ toComplete: this.todoList.taskAt(pos - 1).id });
  }

  toggleComplete(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.toggleTaskCompleteAt(pos - 1);
    this.show();
    let toggle = this.todoDB.db.prepare('UPDATE tasks SET isComplete = @new WHERE id = @toToggle');
    toggle.run({ new: (this.todoList.taskAt(pos - 1).isComplete ? 0 : 1), toToggle: this.todoList.taskAt(pos - 1).id });
  }

  toggleImportant(positionInput) {
    let pos = getPositionOrError(positionInput);
    this.todoList.toggleTaskImportantAt(pos - 1);
    this.show();
    let toggle = this.todoDB.db.prepare('UPDATE tasks SET isImportant = @new WHERE id = @toToggle');
    toggle.run({ new: (this.todoList.taskAt(pos - 1).isImportant ? 0 : 1), toToggle: this.todoList.taskAt(pos - 1).id });
  }
}

module.exports = TodoListController;
