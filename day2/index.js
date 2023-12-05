const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const partTwo = () => {
  let total = 0;
  lines.forEach((line, lineNum) => {
    const mins = {
      red: 0,
      green: 0,
      blue: 0,
    }
    const pulls = line.replace(/Game \d+: /, '').split('; ')
    for (const pull of pulls) {
      const setOfCubes = pull.split(', ');
      for (const set of setOfCubes) {
        const amount = parseInt(set.split(' ')[0], 10);
        const color = set.split(' ')[1];
        if (amount > mins[color]) {
          mins[color] = amount;
        }
      }
    }
    const power = mins.red * mins.green * mins.blue;
    total += power;
  });
  console.log(total);
}

const partOne = () => {
  const maxes = {
    red: 12,
    green: 13,
    blue: 14,
  }
  
  let total = 0;
  
  lines.forEach((line) => {
    const gameNum = line.split(':')[0].replace('Game ', '');
    const pulls = line.replace(/Game \d+: /, '').split('; ')
    for (const pull of pulls) {
      const setOfCubes = pull.split(', ');
      for (const set of setOfCubes) {
        const amount = parseInt(set.split(' ')[0], 10);
        const color = set.split(' ')[1];
        if (amount > maxes[color]) {
          return;
        }
      }
    }
    total += parseInt(gameNum, 10);
  });
  console.log('Part 1', total);
}

partOne();
partTwo();