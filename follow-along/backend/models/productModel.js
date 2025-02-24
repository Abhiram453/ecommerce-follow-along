let mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"]
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"]
  },
  tags: {
    type: [String],
    required: [true, "Please enter product tags"]
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"]
  },
  category: {
    type: String,
    required: [true, "Please enter the product category"]
  },
  images: {
    type: [String],
    required: [true, "Please upload product images"]
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ]
  }
},
{
  timestamps: true
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;