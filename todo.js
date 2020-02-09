let TodoList = require('./lib/TodoList');
let Task = require('./lib/Task');

let TodoListController = require('./lib/TodoListController');

let TodoFile = require('./lib/TodoFile');

let TODO_FILENAME = './todos.txt';

let todoFile = new TodoFile(TODO_FILENAME);
let controller = new TodoListController(todoFile)

controller.show();
console.log('-------');

console.log();
console.log('Marking a task complete...');
console.log('-------');

controller.complete(2);

controller.show();

console.log();
console.log('Removing a task...');
console.log('-------');

controller.remove(1);

controller.show();
