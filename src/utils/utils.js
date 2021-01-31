const fs = require('fs');

const readCsv = (filepath) => {
  try {
    const csv = fs.readFileSync(filepath, 'latin1');
    const csvLines = csv.toString().split('\n');

    return csvLines;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const verifyCsv = (array) => {
  let csvValid = true;

  if (array.length < 1) {
    return false;
  }

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].length < 10) {
      csvValid = false;
      break;
    }
  }
  return csvValid;
};

const isStringMissing = (value) => (value === '' ? 'corrupt data' : value);

const isNumberMissing = (value) => (value === '' ? null : Number(value));

module.exports = {
  verifyCsv,
  readCsv,
  isStringMissing,
  isNumberMissing,
};
