const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const arr = input;
  // eslint-disable-next-line no-unused-vars
  const number = Number(lines[0]);
  for (let i = 1; i <= Number(lines[0]); i += 1) {
    arr[i] = lines[i].split(' ');
  }
  console.log(arr);
}

rl.on('close', () => {
  solve(lines);
});

// solve(["3", "1 2 1", "1 1 -1", "2 2 1"]);
