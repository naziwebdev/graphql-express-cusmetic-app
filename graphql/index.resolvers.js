const userResolvers = require("./resolvers/user.resolvers");

const RootResolvers = {
  Query: {},

  Mutation: {
    registerUser: userResolvers.registerUser,
  },
};

module.exports = RootResolvers;
