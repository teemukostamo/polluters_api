const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Type {
    total
    solidfuel
    liquidfuel
    gasfuel
    cement
    gasflaring
    percapita
    bunkerfuels
  }
  type Polluter {
    country: String!
    total: Int
    solidFuel: Int
    liquidFuel: Int
    gasFuel: Int
    cement: Int
    gasFlaring: Int
    perCapita: Float
    bunkerFuels: Int
  }

  type PollutersByYear {
    year: Int!
    polluters: [Polluter!]!
  }
  type Query {
    polluters(from: Int!, to: Int, top: Int, type: [Type!]!): [PollutersByYear]!
  }
`;

module.exports = typeDefs;
