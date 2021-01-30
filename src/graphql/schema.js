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

  enum SortOrder {
    asc
    desc
  }

  type Polluter {
    country: String!
    total: Int
    solidfuel: Int
    liquidfuel: Int
    gasfuel: Int
    cement: Int
    gasflaring: Int
    percapita: Float
    bunkerfuels: Int
  }

  type PollutersByYear {
    year: Int!
    polluters: [Polluter!]!
  }

  type PollutersByYearConnection {
    polluters: [PollutersByYear!]!
    totalCount: Int!
  }

  type Query {
    polluters(
      """
      The year to start showing results from
      """
      from: Int!
      """
      The year to show results to
      """
      to: Int
      """
      The number of polluters to show. Must be >= 1. Default = 20
      """
      top: Int
      """
      The pollution category to sort results by. Defaults to total.
      """
      sortBy: Type
    ): PollutersByYearConnection!
  }
`;

module.exports = typeDefs;
