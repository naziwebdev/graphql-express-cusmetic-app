const UserModel = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidator } = require("../../validators/register.validator");
const { loginValidator } = require("../../validators/login.validator");
const { validateToken } = require("../../utils/auth");

module.exports = {
  registerUser: async (_, args) => {
    try {
      const { username, email, phone, password } = args.input;

      await registerValidator.validate({ username, email, phone, password });

      const isExistUser = await UserModel.findOne({ phone });
      if (isExistUser) {
        throw new Error("user exist already");
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

      const userObject = user.toObject();
      Reflect.deleteProperty(userObject, "password");

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30day",
      });

      return {
        token: accessToken,
        user: userObject,
      };
    } catch (err) {
      throw new Error(err);
    }
  },

  loginUser: async (_, args) => {
    try {
      const { identifier, password } = args;

      await loginValidator.validate(args);

      const user = await UserModel.findOne({
        $or: [{ email: identifier }, { phone: identifier }],
      });

      if (!user) {
        throw new Error("user not found");
      }

      const validatePassword = await bcrypt.compare(password, user.password);

      if (!validatePassword) {
        throw new Error("password or identifier is incorrect");
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30day",
      });

      const userObject = user.toObject();
      Reflect.deleteProperty(userObject, "password");

      return {
        token: accessToken,
        user: userObject,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  users: async (_,args,context) => {
    try {
      const user = await validateToken(context.req);

      if (user.role !== 'ADMIN') {
        throw new Error("access this route is forbidden");
     
      }
      const users = await UserModel.find({}, "-password").lean();

      return users;
    } catch (error) {
      throw new Error(error);
    }
  },
};
