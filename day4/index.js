const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const getNums = (str) => {
  const nums = [];
  const matches = str.matchAll(/[0-9]+/g);
  for (const [match] of matches) {
    nums.push(match)
  }
  return nums;
}

const partTwo = () => {
  const map = {};
  let numOfOriginalCards = 0;
  for (const line of lines) {
    const gameNum = line.split(':')[0].replace(/Card +/, '');
    const splitLine = line.replace(/Card +\d+: /).split(' | ');
    const winningNums = getNums(splitLine[0])
    const myNums = getNums(splitLine[1])
    let matches = 0;
    for (const num of myNums) {
      if (winningNums.includes(num)) {
        matches += 1;
      }
    }
    map[gameNum] = matches;
    numOfOriginalCards += 1;
  }
  let totalNumerOfCards = 0;
  const countTheNums = (cardNum) => {
    if (cardNum > numOfOriginalCards) {
      return;
    }
    totalNumerOfCards += 1;
    const winning = map[cardNum];
    for (let i=1; i<=winning; i++) {
      countTheNums(cardNum + i);
    }
  }
  for (let i=1; i<=numOfOriginalCards; i++) {
    countTheNums(i);
  }
  console.log('Part two', totalNumerOfCards);
}

const partOne = () => {
  let total = 0;
  for (const line of lines) {
    const splitLine = line.replace(/Card +\d+: /).split(' | ');
    const winningNums = getNums(splitLine[0])
    const myNums = getNums(splitLine[1])
    let winnings = 0;
    for (const num of myNums) {
      if (winningNums.includes(num)) {
        if (winnings === 0) {
          winnings = 1;
        } else {
          winnings *= 2;
        }
      }
    }
    total += winnings;
  }
  console.log('Part one', total);
}

partOne();
partTwo();
