let fs = require('fs');
let TodoList = require('./TodoList');

class TodoFile {
  constructor(fileName) {
    this.fileName = fileName;
  }

  loadTodoList() {
    let contents = fs.readFileSync(this.fileName, 'utf8');

    return TodoList.createFromString(contents);
  }
}

module.exports = TodoFile;
