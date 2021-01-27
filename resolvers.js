const resolvers = {
  Query: {
    polluters: async (root, args, { dataSources }) => {
      let allData = await dataSources.PollutersAPI.getPolluters(args);

      if (args.to) {
        allData = allData.filter((element) => element.year <= args.to);
      }

      return allData;
      // console.log(dataSources.PollutersAPI.getPolluters(args.from));
    },
  },
};

module.exports = resolvers;
