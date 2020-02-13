
class Task {
  static createFromString(taskString) {
    // Code here with regex
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
