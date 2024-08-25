const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required:true
    },
    countAvailabe: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Cusmetic", schema);

module.exports = model;
