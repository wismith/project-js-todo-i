
class Task {
  static createFromRowItem(rowItem) {
    return new Task(rowItem.id, rowItem.description, rowItem.isComplete, rowItem.isImportant);
  }

  constructor(id, description, isComplete = false, isImportant = false) {
    this.id = id;
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
    } else {
      return '';
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

  attributes() {
    return {
      description: this.description,
      isComplete: this.isComplete,
      isImportant: this.isImportant,
    };
  }
}

module.exports = Task;
