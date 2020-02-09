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

  saveTodoList(todoList) {
    let contents = todoList.tasks.map(t => t.toString()).join('\n') + '\n';

    fs.writeFileSync(this.fileName, contents);
  }
}

module.exports = TodoFile;
