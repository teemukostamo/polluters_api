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
  introspection: true,
  playground: true,
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

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

app.get('/', (req, res) => {
  const response = {
    message: 'Welcome to Polluters API',
    graphqlEndpoint: '/graphql',
    RESTendpoint: '/worst/polluters',
    RESTparameters: {
      from: 'MANDATORY - number between 1751 and 2013',
      type:
        'MANDATORY - type of pollution, one of the following: total | cement | liquidfuel | gasfuel | gasflaring | percapita | bunkerfuels | solidfuel',
      to: 'OPTIONAL - number bigger than from and between 1752 and 2014',
      top: 'OPTIONAL - the number of how many top polluters is shown',
    },
  };

  res.send(response);
});

app.use(errorHandler);

module.exports = app;
