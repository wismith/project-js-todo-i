class TaskStringError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskStringError';
  }
}

class Task {
  static createFromString(taskString) {
    let taskRegex = /\[([ X])\]\s*(.*)/;
    let matchData = taskString.match(taskRegex);

    if (matchData === null) {
      throw new TaskStringError(`Invalid task string: '${taskString}'`);
    }

    let description = matchData[2];
    let isComplete = matchData[1] === 'X';

    return new Task(description, isComplete);
  }

  constructor(description, isComplete = false) {
    this.description = description;
    this.isComplete = isComplete;
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

  toString() {
    return `[${this.markCharacter()}] ${this.description}`;
  }
}

module.exports = Task;
