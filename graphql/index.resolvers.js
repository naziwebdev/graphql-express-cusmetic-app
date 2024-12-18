const userResolvers = require("./resolvers/user.resolvers");
const cusmeticResolvers = require("./resolvers/cusmetic.resolvers");
const categoryResolvers = require("./resolvers/category.resolvers");
const orderResolvers = require("./resolvers/order.resolver");

const RootResolvers = {
  Query: {
    users: userResolvers.users,
    categories: categoryResolvers.categories,
    cusmetices: cusmeticResolvers.cusmetices,
    cusmetic: cusmeticResolvers.cusmetic,
    getMe: userResolvers.getMe,
    order: orderResolvers.order,
    orders: orderResolvers.orders,
  },

  Mutation: {
    registerUser: userResolvers.registerUser,
    loginUser: userResolvers.loginUser,
    addCusmetic: cusmeticResolvers.addCusmetic,
    addCategory: categoryResolvers.addCategory,
    createOrder: orderResolvers.createOrder,
    deliverOrder: orderResolvers.deliverOrder,
    removeOrder: orderResolvers.removeOrder,
    removeCategory: categoryResolvers.removeCategory,
    removeCusmetic: cusmeticResolvers.removeCusmetic,
    removeUser: userResolvers.removeUser,
    editCategory: categoryResolvers.editCategory,
    editCusmetic: cusmeticResolvers.editCusmetic,
  },
};

module.exports = RootResolvers;
