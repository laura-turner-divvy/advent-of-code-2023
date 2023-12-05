const fs = require('fs');
const lines = ['eighthree']; //  fs.readFileSync('./input.txt', 'utf-8').split('\n');
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
const nums = lines.map((line, index) => {
  const nums = /(?=(eight)|(three))/.exec(line)
  const first = nums[0];
  const last = nums[nums.length - 1];
  const out = `${numMapping[first] ?? first}${numMapping[last] ?? last}`
  if (index > -1) {
    console.log(line);
    console.log(nums);
    console.log(out);
    console.log('');
  }
  if (out.length !== 2) {
    console.log('ruh roh', out, out.length);
  }
  return parseInt(out, 10);
});
const output = nums.reduce((out, curr) => out + curr, 0);
console.log(output);