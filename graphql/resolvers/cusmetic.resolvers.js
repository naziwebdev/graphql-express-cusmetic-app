const CusmeticModel = require("../../models/Cusmetic");
const { validateToken } = require("../../utils/auth");
const { cusmeticValidator } = require("../../validators/cusmetic.validator");

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
};
