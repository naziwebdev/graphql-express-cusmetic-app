const UserModel = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidator } = require("../../validators/register.validator");

module.exports = {
  registerUser: async (_, args) => {
    try {
      const { username, email, phone, password } = args.input;

      await registerValidator.validate({ username, email, phone, password });

      const isExistUser = await UserModel.findOne({phone})
      if(isExistUser){
        throw new Error('user exist already')
      }

      const countUser = await UserModel.countDocuments();

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        phone,
        role: countUser > 0 ? "USER" : "ADMIN",
      });

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30day",
      });

      return {
        token: accessToken,
        user,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};
