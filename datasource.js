const { DataSource } = require('apollo-datasource');
const db = require('./db');

class PollutersAPI extends DataSource {
  constructor() {
    super();
  }

  async getPolluters(args) {
    const response = await new Promise((resolve, reject) => {
      db.find({ year: { $gte: args.from } }, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
    // console.log('data after promise', data);

    // const pollutersArray = [];
    // data.forEach((d) => {
    //   const document = {
    //     country: d.country,
    //     total: d.total,
    //   };
    //   pollutersArray.push(document);
    // });
    // const response = { year: 1999, polluters: pollutersArray };

    // console.log('resonse', response);
    return this.pollutersReducer(response);
  }

  pollutersReducer(response) {
    // console.log('response at reducer', response);
    return response;
  }
}

module.exports = PollutersAPI;
