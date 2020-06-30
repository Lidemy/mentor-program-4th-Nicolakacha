const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const arr = [];
  for (let i = 1; i <= Number(input[0]); i += 1) {
    arr[i - 1] = input[i].split(' ');
  }
  for (let i = 0; i < arr.length; i += 1) {
    // eslint-disable-next-line no-undef
    const A = BigInt(arr[i][0]);
    // eslint-disable-next-line no-undef
    const B = BigInt(arr[i][1]);
    // eslint-disable-next-line no-undef
    const K = Number(arr[i][2]);

    if (A === B) {
      console.log('DRAW');
    } else if (A > B && K === 1) {
      console.log('A');
    } else if (A < B && K === 1) {
      console.log('B');
    } else if (A > B && K === -1) {
      console.log('B');
    } else if (A < B && K === -1) {
      console.log('A');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});

// solve(["3", "500 300 -1", "1 2 -1", "2 2 1"]);
