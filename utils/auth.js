const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const { GraphQLError } = require("graphql");

const validateToken = async (req) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new Error("token not found");
      }

      const payload = jwt.verify(token, process.env.SECRET_KEY);

      const user = await UserModel.findOne({ _id: payload.id });

      if (!user) {
        throw new Error("not found user");
      }

      return user;
    } else {
      throw new Error("not auth");
    }
  } else {
    throw new Error("not auth");
  }
};

module.exports = { validateToken };
