class TaskStringError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskStringError';
  }
}

class Task {
  static createFromString(taskString) {
    // Code here with regex
    let taskRegex = /\[([ X])\]\s*(.*)/;
    let matchData = taskString.match(taskRegex);
    if (matchData === null) {
      throw new TaskStringError(`Invalid task string: '${taskString}'`);
    }

    let description = matchData[2];
    let isComplete = matchData[1] === 'X';

    return new Task(description, isComplete);
  }

  constructor(description, isComplete = false, isImportant = false) {
    this.description = description;
    this.isComplete = isComplete;
    this.isImportant = isImportant;
  }

  markComplete() {
    this.isComplete = true;
    return this;
  }

  markIncomplete() {
    this.isComplete = false;
    return this;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
    return this;
  }

  markCharacter() {
    if (this.isComplete) {
      return 'X';
    } else {
      return ' ';
    }
  }

  markImportant() {
    this.isImportant = true;
    return this;
  }

  markUnimportant() {
    this.isImportant = false;
    return this;
  }

  toggleImportant() {
    this.isImportant = !this.isImportant;
    return this;
  }

  toString() {
    return `[${this.markCharacter()}] ${this.description}`;
  }
}

module.exports = Task;
