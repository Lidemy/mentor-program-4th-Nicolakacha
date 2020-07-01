/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function compare(a, b, k) {
  if (a === b) return 'DRAW';
  if (k == -1) {
    // a 和 b 互換
    const temp = a;
    a = b;
    b = temp;
  }

  const lengthA = a.length;
  const lengthB = b.length;
  // 直接比較位數，位數多的就比較大
  if (lengthA != lengthB) {
    return lengthA > lengthB ? 'A' : 'B';
  }
  // 如果 a 和 b 字串長度相等，就比較字典序
  return a > b ? 'A' : 'B';
}

// eslint-disable-next-line no-shadow
function solve(lines) {
  for (let i = 1; i <= Number(lines[0]); i += 1) {
    const [a, b, k] = lines[i].split(' ');
    console.log(compare(a, b, k));
  }
}

rl.on('close', () => {
  solve(lines);
});

// solve(["3", "500 300 -1", "1 2 -1", "2 2 1"]);

// function solve(input) {
//   const arr = [];
//   for (let i = 1; i <= Number(input[0]); i += 1) {
//     arr[i - 1] = input[i].split(' ');
//   }
//   for (let i = 0; i < arr.length; i += 1) {
//     // eslint-disable-next-line no-undef
//     const A = BigInt(arr[i][0]);
//     // eslint-disable-next-line no-undef
//     const B = BigInt(arr[i][1]);
//     const K = Number(arr[i][2]);

//     if (A === B) {
//       console.log('DRAW');
//     } else if (A > B && K === 1) {
//       console.log('A');
//     } else if (A < B && K === 1) {
//       console.log('B');
//     } else if (A > B && K === -1) {
//       console.log('B');
//     } else if (A < B && K === -1) {
//       console.log('A');
//     }
//   }
// }
