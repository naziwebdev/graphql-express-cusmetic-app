const { isValidObjectId } = require("mongoose");
const CusmeticModel = require("../../models/Cusmetic");
const { validateToken } = require("../../utils/auth");
const {
  cusmeticValidator,
  editCusmeticValidator,
} = require("../../validators/cusmetic.validator");

module.exports = {
  addCusmetic: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);
      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }

      const { title, price, category, countAvailable } = args;

      await cusmeticValidator.validate({
        title,
        price,
        category,
        countAvailable,
      });

      return await CusmeticModel.create({
        title,
        price,
        category,
        image: "",
        countAvailable,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  cusmetices: async () => {
    return await CusmeticModel.find({}).populate("category");
  },
  cusmetic: async (_, { id }) => {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("id in invalid");
      }

      return await CusmeticModel.findOne({ _id: id }).populate("category");
    } catch (error) {
      throw new Error(error);
    }
  },
  removeCusmetic: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);
      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }
      const { id } = args;

      if (!isValidObjectId(id)) {
        throw new Error("id is invalid");
      }

      return await CusmeticModel.findOneAndDelete({ _id: id }).populate(
        "category"
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  editCusmetic: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);
      if (user.role !== "ADMIN") {
        throw new Error("access to this route is forbidden");
      }
      const { title, price, category, countAvailable, id } = args;

      if (!isValidObjectId(id)) {
        throw new Error("id is invalid");
      }

      await editCusmeticValidator.validate({
        id,
        title,
        price,
        category,
        countAvailable,
      });

      return await CusmeticModel.findOneAndUpdate(
        { _id: id },
        { title, price, category, countAvailable },
        { new: true }
      ).populate("category");
    } catch (error) {
      throw new Error(error);
    }
  },
};
