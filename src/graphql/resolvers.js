const _ = require('lodash');

const resolvers = {
  Query: {
    polluters: async (
      root,
      { from, to, top = 20, sortBy = 'total' },
      { dataSources },
    ) => {
      let allData = await dataSources.PollutersAPI.getPolluters(from);

      if (to && to > from) {
        allData = allData.filter((element) => element.year <= to);
      }

      allData.sort((a, b) => a.year - b.year);

      let filteredResults = [];

      allData.forEach((data) => {
        const filteredPolluters = [];
        data.polluters.forEach((polluter) => {
          let result = _.mapValues(polluter, (v) => (v === null ? -1 : v));
          filteredPolluters.push(result);
        });

        const result = {
          year: data.year,
          polluters: _.sortBy(filteredPolluters, [sortBy])
            .reverse()
            .slice(0, top),
        };

        filteredResults.push(result);
      });

      return {
        polluters: filteredResults,
        totalCount: allData.length,
      };
    },
  },
};

module.exports = resolvers;
