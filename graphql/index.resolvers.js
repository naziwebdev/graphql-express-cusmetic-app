const userResolvers = require("./resolvers/user.resolvers");

const RootResolvers = {
  Query: {
    users:userResolvers.users
    
  },

  Mutation: {
    registerUser: userResolvers.registerUser,
  },
};

module.exports = RootResolvers;
