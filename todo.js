let process = require('process');

let printUsage = require('./lib/printUsage');

let TodoListController = require('./lib/TodoListController');
let TodoFile = require('./lib/TodoFile');

let TODO_FILENAME = './todos.txt';

let todoFile = new TodoFile(TODO_FILENAME);
let controller = new TodoListController(todoFile);

let userArgs = process.argv.slice(2);
let command = userArgs[0];
let input = userArgs[1];

function errorMesssageAndExit(message) {
  console.log(`Error: ${message}`);
  console.log();

  printUsage();

  process.exit(1);
}

if (command === undefined) {
  errorMesssageAndExit('No command given');
}

try {
  controller.dispatch(command, input);
} catch (err) {
  errorMesssageAndExit(err.message);
}
