let columnify = require('columnify')

function printUsage() {
  let usageInfo = [
    {
      command: 'node todo.js show',
      description: 'Show current todo list',
    },
    {
      command: 'node todo.js add "Walk the dog"',
      description: 'Add task to todo list',
    },
    {
      command: 'node todo.js remove 18',
      description: 'Remove task #18 from todo list',
    },
    {
      command: 'node todo.js complete 7',
      description: 'Mark task #7 as complete',
    },
    {
      command: 'node todo.js incomplete 99',
      description: 'Mark task #99 as incomplete',
    },
    {
      command: 'node todo.js toggle 46',
      description: 'Toggle completeness of task #46',
    },
  ];

  console.log('Usage:');
  console.log();
  console.log(columnify(usageInfo, { columnSplitter: '     ' }));
}

module.exports = printUsage;
