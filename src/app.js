const express = require('express');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const PollutersAPI = require('./graphql/datasource');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { getPolluters } = require('./rest/controllers');
const errorHandler = require('./utils/error');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    PollutersAPI: new PollutersAPI(),
  }),
});

const app = express();

server.applyMiddleware({ app });

app.use(xss());
app.use(hpp());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/worst/polluters', getPolluters);

app.use(errorHandler);

module.exports = app;

// Another route that generates a CSV
// app.get('/generate-csv', generateCSV);

// app.post('/generate-csv-with-data', function(req, res, next) {
//     var myField = req.body.myField;
//     //Do stuff with your data before generating csv
//     req.csvData = myField;
//     return next();
// }, generateCSV)

// function generateCSV(req, res, next) {
//     // Generate your CSV using data from req.csvData
//     // Then use the res method to return the csv to the user
//     return res.send();
// }