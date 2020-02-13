let fs = require('fs');

class Task {
  constructor(description, complete = false, priority = false) {
    this.description = description;
    this.complete = complete;
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

// Read from .txt file
let strings = fs.readFileSync('tasks.txt', 'utf-8').trimEnd().split('\n');
let tasks = [];
for (let item of strings) {
  let properties = item.split('%');
  tasks.push(new Task(properties[0], JSON.parse(properties[1]), JSON.parse(properties[2])));
}

console.log(tasks);

// Write to .txt file

function updateTextFile(myToDoS) {
  let list = [];
  for (let task of myToDoS.tasks) {
    let taskString = '';
    taskString += task.description;
    taskString += '%' + task.complete.toString();
    taskString += '%' + task.priority.toString();
    list.push(taskString);
  }
  fs.writeFileSync('tasks.txt', list.join('\n'));
}
