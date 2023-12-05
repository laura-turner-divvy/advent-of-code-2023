const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');
const map = {};
lines.forEach((line, rowNum) => {
  map[rowNum] = {};
  for (let i=0; i<line.length; i++) {
    map[rowNum][i] = line.charAt(i);
  }
})

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const bordersAspecial = (rowNum, startCol, endCol) => {
  for (let r=rowNum-1; r<=rowNum+1; r++) {
    if (!map[r]) {
      continue;
    }
    for (let c=startCol-1; c<=endCol+1; c++) {
      const char = map[r][c];
      if (char && char !== '.' && !numbers.includes(char)) {
        return true;
      }
    }
  }
  return false;
};

const partTwo = () => {
  const getNumbersOnRow = (rowNum) => {
    const matches = (lines[rowNum] ?? '').matchAll(/[0-9]+/g);
    const out = [];
    for (const match of matches) {
      const num = match[0];
      const startCol = match.index;
      const endCol = match.index + num.length - 1;
      out.push({
        num,
        startCol,
        endCol,
      });
    }
    return out;
  }
  const getBorderingNumbers = (rowNum, colNum) => {
    return [
      ...getNumbersOnRow(rowNum - 1),
      ...getNumbersOnRow(rowNum),
      ...getNumbersOnRow(rowNum + 1),
    ].filter(({
      startCol,
      endCol,
    }) => {
      if (startCol <= colNum && endCol >= colNum) {
        return true;
      }
      if (endCol === colNum - 1) {
        return true;
      }
      if (startCol === colNum + 1) {
        return true;
      }
      return false;
    }).map(({ num }) => num);
  }

  let total = 0;

  lines.forEach((line, rowNum) => {
    const gears = line.matchAll(/\*/g);
    for (const gear of gears) {
      const adjacentNums = getBorderingNumbers(rowNum, gear.index);
      if (adjacentNums.length === 2) {
        total += parseInt(adjacentNums[0], 10) * parseInt(adjacentNums[1], 10);
      }
    }
  });

  console.log('Part two', total);
}

const partOne = () => {
  let sum = 0;
  lines.forEach((line, rowNum) => {
    const matches = line.matchAll(/[0-9]+/g);
    const taking = [];
    for (const match of matches) {
      const rawNumber = match[0];
      const startIndex = match.index;
      if (bordersAspecial(rowNum, startIndex, startIndex + rawNumber.length - 1)) {
        sum += parseInt(rawNumber, 10);
        taking.push(rawNumber);
      }
    }
  });
  console.log('Part one', sum);
}

partOne();
partTwo();