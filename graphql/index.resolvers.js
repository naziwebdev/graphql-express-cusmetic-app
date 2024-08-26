const userResolvers = require("./resolvers/user.resolvers");

const RootResolvers = {
  Query: {
    users: userResolvers.users,
  },

  Mutation: {
    registerUser: userResolvers.registerUser,
    loginUser: userResolvers.loginUser,
  },
};

module.exports = RootResolvers;
