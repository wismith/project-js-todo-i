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
let readlineSync = require('readline-sync');

class ToDoList {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
  }

  delete(index) {
    return this.tasks.splice(index, 1);
  }

  edit(index, change) {
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

  show() {
    console.log(' Here\'s your To-Do list: ');
    let checkboxDict = { true: '[X]', false: '[_]' };
    let priorityDict = { true: '(!)', false: '' };
    for (let task of this.tasks) {
      console.log(` ${checkboxDict[task.complete]} ${this.tasks.indexOf(task) + 1}: ${task.description}  ${priorityDict[task.priority]}`);
    }
  }
}

class Task {
  constructor(description, priority = false) {
    this.description = description;
    this.complete = false;
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
    this.complete = true;
  }
}

function readFromTextFile(file, toDoList) {
  let strings = fs.readFileSync(file, 'utf-8').trimEnd().split('\n');
  for (let item of strings) {
    let properties = item.split('%');
    if (properties.length === 3) {
      toDoList.tasks.push(new Task(properties[0], JSON.parse(properties[1]), JSON.parse(properties[2])));
    } else {
      toDoList.tasks.push(new Task(properties[0]));
    }
  }
}

function updateTextFile(file, toDoList) {
  let list = [];
  for (let task of toDoList.tasks) {
    let taskString = '';
    taskString += task.description;
    taskString += '%' + task.complete.toString();
    taskString += '%' + task.priority.toString();
    list.push(taskString);
  }
  fs.writeFileSync(file, list.join('\n'));
}

const myToDoS = new ToDoList();
readFromTextFile('todos.txt', myToDoS);

// Interactive shell
if (process.argv[2] === '--interactive') {
  myToDoS.show();
  readlineSync.promptCLLoop({
    show: function() {
      myToDoS.show();
    },
    add: function(description) {
      myToDoS.tasks.push(new Task(description));
      console.log(`Adding "${description}" to your To-Do list...`);
      console.log();
      myToDoS.show();
    },
    delete: function(index) {
      console.log(`Deleting "${myToDoS.tasks[index - 1].description}" from your To-Do list...`);
      console.log();
      myToDoS.delete(index - 1);
      myToDoS.show();
    },
    edit: function(index, change) {
      console.log(`Editing "${myToDoS.tasks[index - 1].description}"...`);
      myToDoS.edit(index - 1, change);
      console.log();
      myToDoS.show();
    },
    togglePriority: function(index) {
      myToDoS.togglePriority(index - 1);
      console.log(`Changing priority of "${myToDoS.tasks[index - 1].description}"`);
      console.log();
      myToDoS.show();
    },
    checkOff: function(index) {
      myToDoS.checkOff(index - 1);
      console.log(`Marking "${myToDoS.tasks[index - 1].description}" as complete...`);
      console.log();
      myToDoS.show();
      if (readlineSync.keyInYN('Do you want to delete it?')) {
        console.log(`Deleting "${myToDoS.tasks[index - 1].description}" from your To-Do list...`);
        console.log();
        myToDoS.delete(index - 1);
        myToDoS.show();
      } else {
        console.log('Ok.');
      }
    },
    done: function() {
      // Update text file
      updateTextFile('todos.txt', myToDoS);
      console.log('Changes saved');
      return true;
    },
  });
}
