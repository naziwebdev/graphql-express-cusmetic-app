const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    cusmetic: {
      type: mongoose.Types.ObjectId,
      ref: "Cusmetic",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    count: {
      type: Number,
      default: 1,
      required: true,
    },
    isDeliver: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Order", schema);

module.exports = model;
