const Datastore = require('nedb');
const { DATABASE_NAME } = require('./config');

const db = new Datastore({ filename: DATABASE_NAME, autoload: true });

db.ensureIndex({ fieldName: 'year' }, (err) => {
  if (err) {
    console.log(`Database indexing error: ${err}`);
  }
});

module.exports = db;
