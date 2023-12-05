const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const numMapping = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};
let output = 0;
lines.forEach((line) => {
  const matches = line.matchAll(/(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g)
  let first = null;
  let last = null;
  for (const [_, match] of matches) {
    if (!first) {
      first = match;
    }
    last = match;
  }
  const out = `${numMapping[first] ?? first}${numMapping[last] ?? last}`;
  output += parseInt(out, 10);
});
console.log(output);