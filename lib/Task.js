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

  constructor(description, isComplete = false, important = false) {
    this.description = description;
    this.isComplete = isComplete;
    this.important = important;
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
    this.important = true;
    return this;
  }

  markUnimportant() {
    this.important = false;
    return this;
  }

  toggleImportant() {
    this.important = !this.important;
    return this;
  }

  toString() {
    return `[${this.markCharacter()}] ${this.description}`;
  }
}

module.exports = Task;
