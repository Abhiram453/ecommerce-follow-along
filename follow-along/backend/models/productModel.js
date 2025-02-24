let mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"]
    },
    price: {
      type: Number,
      required: [true, "Please enter the product price"]
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"]
    },
    category: {
      type: String,
      required: [true, "Please enter the product category"]
    },
    stock: {
      type: Number,
      required: [true, "Please enter the product stock"]
    },
    images: {
      type: [String],
      required: [true, "Please upload product images"]
    },
    tags: {
      type: String,
      required: [true, "Please enter product tags"]
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please add a valid email address"
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);