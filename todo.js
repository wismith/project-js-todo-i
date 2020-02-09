let TodoList = require('./lib/TodoList');
let Task = require('./lib/Task');

function showList(todoList) {
  for (let pos = 1; pos <= todoList.length(); pos++) {
    let task = todoList.taskAtPosition(pos);

    console.log(`${pos}. ${task.toString()}`);
  }
}

let list = new TodoList();

list.add(new Task('Walk the dog', false));
list.add(new Task('Sing a song', false));
list.add(new Task('Bake a cake', false));

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
