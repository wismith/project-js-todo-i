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

const myToDoS = new ToDoList();

for (let description of fs.readFileSync('todos.txt', 'utf-8').trimEnd().split('\n')) {
  myToDoS.add(new Task(description));
}

function updateTextFile(myToDoS) {
  let taskString = '';
  for (let task of myToDoS.tasks) {
    taskString += task.description + '\n';
  }
  fs.writeFileSync('todos.txt', taskString);
}

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
      console.log(`Marking "${myToDoS.task[index - 1]}" as complete...`);
    },
    done: function() {
      // Update text file
      updateTextFile(myToDoS);
      console.log('Changes saved');
      return true;
    },
  });
}
