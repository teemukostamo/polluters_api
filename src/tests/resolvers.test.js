const gql = require('graphql-tag');

const apolloTestServer = require('./apolloTestServer');

describe('resolvers', () => {
  const { query } = apolloTestServer(() => ({}));

  const GET_POLLUTERS = gql`
    query getPolluters($from: Int!, $to: Int, $top: Int, $sortBy: Type) {
      polluters(from: $from, to: $to, top: $top, sortBy: $sortBy) {
        totalCount
        polluters {
          year
          polluters {
            country
            total
            solidfuel
            liquidfuel
            gasfuel
            cement
            gasflaring
            percapita
            bunkerfuels
          }
        }
      }
    }
  `;

  it('fetches polluters from the api', async () => {
    const res = await query({
      query: GET_POLLUTERS,
      variables: { from: 2000, top: 20 },
    });

    // there are no errors
    expect(res.errors).toBe(undefined);

    // totalCount has correct length
    expect(res.data.polluters.totalCount).toBe(15);

    // top polluters amount matches top parameter
    res.data.polluters.polluters.forEach((p) => {
      expect(p.polluters.length).toBe(20);
    });
  });
});
