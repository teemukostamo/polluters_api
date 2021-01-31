const {
  readCsv,
  isStringMissing,
  isNumberMissing,
} = require('./src/utils/utils');
const db = require('./src/config/db');

const savePollutersToDB = () => {
  try {
    const lines = readCsv('fossil-fuel-co2-emissions-eviled-1.csv');
    const data = [];

    for (let i = 1; i < lines.length - 1; i++) {
      const prevLine = lines[i - 1].split(',');
      const line = lines[i].split(',');
      const nextLine = lines[i + 1].split(',');

      let year = line[0];

      if (year === '' && nextLine[0] === prevLine[0]) {
        // eslint-disable-next-line prefer-destructuring
        year = prevLine[0];
      }

      const doc = {
        year: isNumberMissing(year),
        country: isStringMissing(line[1]),
        total: isNumberMissing(line[2]),
        solidfuel: isNumberMissing(line[3]),
        liquidfuel: isNumberMissing(line[4]),
        gasfuel: isNumberMissing(line[5]),
        cement: isNumberMissing(line[6]),
        gasflaring: isNumberMissing(line[7]),
        percapita: isNumberMissing(line[8]),
        bunkerfuels: isNumberMissing(line[9]),
      };

      data.push(doc);
    }
    const years = [...new Set(data.map((d) => d.year))];
    const result = [];
    years.forEach((year) => {
      const polluters = data.filter((d) => d.year === year);
      const obj = {
        year,
        polluters,
      };
      result.push(obj);
    });

    db.insert(result);

    // eslint-disable-next-line no-unused-expressions
    result.length > 0
      ? console.log(`initialized database with ${result.length} records.`)
      : console.log('problem initializing database');
  } catch (error) {
    console.log(error);
  }
};

savePollutersToDB();
