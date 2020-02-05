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
// let process = require('process');
let fs = require('fs');

class ToDoList {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
  }

  deleteTask(index) {
    return this.tasks.splice(index, 1);
  }

  editTask(index, change) {
    this.tasks[index].edit(change);
  }

  togglePriority(index) {
    if (this.tasks[index].priority) {
      this.tasks[index].unprioritize();
    } else {
      this.tasks[index].prioritize();
    }
  }

  checkOff(index) {
    this.tasks[index].checkOff();
  }

  showTasks() {
    for (let task of this.tasks) {
      if (task.priority) {
        console.log(` ${this.tasks.indexOf(task) + 1}: ${task.description}  (!)`);
      } else {
        console.log(` ${this.tasks.indexOf(task) + 1}: ${task.description}`);
      }
    }
  }
}

class Task {
  constructor(description, priority = false) {
    this.description = description;
    this.status = 'incomplete';
    this.priority = priority;
  }

  edit(change) {
    this.description = change;
  }

  prioritize() {
    this.priority = true;
  }

  unprioritize() {
    this.priority = false;
  }

  checkOff() {
    this.status = 'complete';
  }
}

let makeBed = new Task('Make my bed');
makeBed.prioritize();
console.log(makeBed);
const myToDoS = new ToDoList();

for (let description of fs.readFileSync('todos.txt', 'utf-8').trimEnd().split('\n')) {
  myToDoS.addTask(description);
}

console.log(myToDoS);

console.log(myToDoS);
myToDoS.showTasks();
myToDoS.deleteTask(1);
console.log(myToDoS);
