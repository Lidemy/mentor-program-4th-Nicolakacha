const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function stars(n) {
  let star = '';
  for (let i = 1; i <= n; i += 1) {
    star += '*';
    console.log(star);
  }
}

function solve(input) {
  stars(input);
}

rl.on('close', () => {
  solve(lines);
});
