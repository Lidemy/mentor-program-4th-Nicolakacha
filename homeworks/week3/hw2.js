const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function Narcissistic(n) { // 153
  const str = String(n);
  let sum = 0;
  for (let i = 0; i < str.length; i += 1) {
    sum += (Number(str[i]) ** str.length);
  }
  if (sum === n) return true;
}

function solve(input) {
  const arr = input[0].split(' ');
  for (let i = Number(arr[0]); i <= Number(arr[1]); i += 1) {
    if (Narcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});

// solve(["5 200"])
