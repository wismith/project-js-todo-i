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
let fs = require('fs');
// let readlineSync = require('readline-sync');

function listTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    console.log(` ${i + 1}: ${tasks[i]}`);
  }
}

function addTask(tasks) {
  let newTask = process.argv[3];
  tasks.push(newTask);
  console.log(' Adding task to your to-do list...');
  listTasks(tasks);
  let taskString = '';
  for (let task of tasks) {
    taskString += task.toString() + '\n';
  }
  fs.writeFileSync('todos.txt', taskString);
}

function deleteTask(tasks) {
  let indexToDelete = process.argv[3] - 1;
  tasks.splice(indexToDelete, 1);
  listTasks(tasks);
  let taskString = '';
  for (let task of tasks) {
    taskString += task.toString() + '\n';
  }
  fs.writeFileSync('todos.txt', taskString);
}

function processTaskList() {
  let tasks = fs.readFileSync('todos.txt', 'utf-8').split('\n'); // This is how I'm currently handling the blank last line of the text file. Better way?
  tasks.pop();
  let action = process.argv[2];
  if (action === 'list') {
    listTasks(tasks);
  }
  if (action === 'add') {
    addTask(tasks);
  }
  if (action === 'delete') {
    deleteTask(tasks);
  }
}

if (require.main === module) {
  processTaskList();
}
