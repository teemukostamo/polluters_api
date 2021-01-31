const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 4000;
const DATABASE_NAME = process.env.DATABASE_NAME || 'database.db';

module.exports = {
  PORT,
  DATABASE_NAME,
};
