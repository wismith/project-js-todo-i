/*
What types of objects do you need?

List out nouns and verbs involved in creating TODO lists.
Decide which nouns and verbs you want/need to model.
The nouns will be your objects and the values the functions.

Write simple functions that work on a few number of well-defined objects.

Keep the responsibilities separated as best you can:

1. Representing a real-life todo list as in-memory objects
2. Manipulating those in-memory objects
3. Reading and writing from the todos.txt file
4. Displaying information to the user
5. Rather user input and taking the appropriate actions
*/

let process = require('process');
let readlineSync = require('readline-sync');

let printUsage = require('./lib/PrintUsage');
let TodoListController = require('./lib/TodoListController');
let TodoDB = require('./lib/TodoDB');
let TODO_DBNAME = './sql/todos.db';

let todoDB = new TodoDB(TODO_DBNAME);
let controller = new TodoListController(todoDB);

let userArgs = process.argv.slice(2);
let command = userArgs[0];
let input = userArgs[1];

function errorMessageAndExit(message) {
  console.log(`Error: ${message}`);
  console.log();
  printUsage();
  process.exit(1);
}

if (command === undefined) {
  errorMessageAndExit('No command given');
}

if (command === '--interactive') {
  controller.dispatch('show', undefined);
  readlineSync.promptCLLoop({
    show: function() {controller.dispatch('show', undefined)},
    add: arg => controller.dispatch('add', arg),
    remove: arg => controller.dispatch('remove', arg),
    complete: arg => controller.dispatch('complete', arg),
    toggleComplete: arg => controller.dispatch('toggleComplete', arg),
    toggleImportant: arg => controller.dispatch('toggleImportant', arg),
    help: () => printUsage(),
    done: () => true,
  });
}

if (command !== '--interactive') {
  try {
    controller.dispatch(command, input);
  } catch (err) {
    errorMessageAndExit(err.message);
  }
}
