const userResolvers = require("./resolvers/user.resolvers");
const cusmeticResolvers = require("./resolvers/cusmetic.resolvers");
const categoryResolvers = require(".//resolvers/category.resolvers");

const RootResolvers = {
  Query: {
    users: userResolvers.users,
    categories:categoryResolvers.categories,
    cusmetices:cusmeticResolvers.cusmetices,
    cusmetic:cusmeticResolvers.cusmetic,
  },

  Mutation: {
    registerUser: userResolvers.registerUser,
    loginUser: userResolvers.loginUser,
    addCusmetic: cusmeticResolvers.addCusmetic,
    addCategory: categoryResolvers.addCategory,
  },
};

module.exports = RootResolvers;
