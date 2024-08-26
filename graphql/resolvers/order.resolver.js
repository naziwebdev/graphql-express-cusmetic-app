const OrderModel = require("../../models/Order");
const { orderValidator } = require("../../validators/order.validator");
const { validateToken } = require("../../utils/auth");

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
};
