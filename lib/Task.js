class TaskStringError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskStringError';
  }
}

class Task {
  static createFromRowItem(rowItem) {
    return new Task(rowItem.description, rowItem.isComplete, rowItem.isImportant);
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

  indicateImportant() {
    if (this.isImportant) {
      return '(!)';
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
    return `[${this.markCharacter()}] ${this.description} ${this.indicateImportant()}`;
  }
}

module.exports = Task;
