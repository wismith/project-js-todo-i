let TodoList = require('./lib/TodoList');
let Task = require('./lib/Task');

let TodoFile = require('./lib/TodoFile');

function showList(todoList) {
  for (let pos = 1; pos <= todoList.length(); pos++) {
    let task = todoList.taskAtPosition(pos);

    console.log(`${pos}. ${task.toString()}`);
  }
}

let TODO_FILENAME = './todos.txt';

let todoFile = new TodoFile(TODO_FILENAME);

let list = todoFile.loadTodoList();

showList(list);
console.log('-------');

console.log();
console.log('Marking a task complete...');
console.log('-------');

list.taskAtPosition(2).markComplete();

showList(list);

console.log();
console.log('Removing a task...');
console.log('-------');

list.removeTaskAtPosition(1);

showList(list);
