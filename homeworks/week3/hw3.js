const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) { return false; }
  }
  return true;
}

function solve(input) {
  const number = input[0];
  const arr = [];
  for (let i = 1; i <= number; i += 1) {
    arr.push(Number(lines[i]));
  }
  for (let j = 0; j < arr.length; j += 1) {
    if (isPrime(arr[j]) === true) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});

// solve(["5", "1", "2", "3", "4", "5"]);
