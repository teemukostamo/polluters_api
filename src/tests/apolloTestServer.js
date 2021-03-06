/* eslint-disable node/no-unpublished-require */
/* eslint-disable import/no-extraneous-dependencies */
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const resolvers = require('../graphql/resolvers');
const typeDefs = require('../graphql/schema');
const PollutersAPI = require('../graphql/datasource');

const apolloTestServer = () =>
  createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        PollutersAPI: new PollutersAPI(),
      }),
    }),
  );

module.exports = apolloTestServer;
