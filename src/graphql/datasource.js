const { DataSource } = require('apollo-datasource');
const db = require('../config/db');

class PollutersAPI extends DataSource {
  constructor() {
    super();
  }

  async getPolluters(from) {
    const response = await new Promise((resolve, reject) => {
      db.find({ year: { $gte: from } }, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });

    return this.pollutersReducer(response);
  }

  pollutersReducer(response) {
    return response;
  }
}

module.exports = PollutersAPI;
