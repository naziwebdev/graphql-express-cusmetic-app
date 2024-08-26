const CategoryModel = require("../../models/Category");
const { validateToken } = require("../../utils/auth");
const { categoryValidator } = require("../../validators/Category.validator");

module.exports = {
  addCategory: async (_, args, context) => {
    try {
      const user = await validateToken(context.req);

      if (user.role !== "ADMIN") {
        throw new Error("access this route is forbidden");
      }

      const { title } = args;

      await categoryValidator.validate({ title });

      const existCategory = await CategoryModel.findOne({ title });
      if (existCategory) {
        throw new Error("this category exist already");
      }

      const category = await CategoryModel.create({ title });

      return category;
    } catch (error) {
      throw new Error(error);
    }
  },

  categories: async () => {
    return await CategoryModel.find({}).lean();
  },
};
