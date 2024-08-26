const OrderModel = require("../../models/Order");
const { orderValidator } = require("../../validators/order.validator");
const { validateToken } = require("../../utils/auth");
const { isValidObjectId } = require("mongoose");

module.exports = {
  createOrder: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);

      if (!user) {
        throw new Error("user require to auth");
      }
      const { cusmetic, count } = args.input;
      await orderValidator.validate({ cusmetic, count });

      const order = await OrderModel.create({
        user: user._id,
        cusmetic,
        count,
      });
      return await OrderModel.findOne({ _id: order._id })
        .populate("user", "-password")
        .populate("cusmetic");
    } catch (error) {
      throw new Error(error);
    }
  },

  deliverOrder: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);

      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }
      const { id } = args;

      if (!isValidObjectId(id)) {
        throw new Error("id is invalid");
      }

      const deliveredOrder = await OrderModel.findOneAndUpdate(
        { _id: id },
        {
          isDeliver: true,
        }
      );

      return await OrderModel.findOne({ _id: deliveredOrder._id })
        .populate("user", "-password")
        .populate("cusmetic");
    } catch (error) {
      throw new Error(error);
    }
  },

  order: async (_, args) => {
    try {
      const { id } = args;

      if (!isValidObjectId(id)) {
        throw new Error("id is invalid");
      }

      return await OrderModel.findOne({ _id: id })
        .populate("user", "-password")
        .populate("cusmetic");
    } catch (error) {
      throw new Error(error);
    }
  },

  removeOrder: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);

      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }
      const { id } = args;

      if (!isValidObjectId(id)) {
        throw new Error("id is invalid");
      }

      return await OrderModel.findOneAndDelete({ _id: id })
        .populate("user", "-password")
        .populate("cusmetic");
    } catch (error) {
      throw new Error(error);
    }
  },
  orders: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);

      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }

      return await OrderModel.find({}).populate("user", "-password").populate("cusmetic");

    } catch (error) {
      throw new Error(error);
    }
  },
};
