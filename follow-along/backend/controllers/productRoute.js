let express = require("express");
const { ProductModel } = require("../models/productModel");
const catchAsyncError = require("../middleware/asyncErrorCatch");
const ErrorHandler = require("../utils/errorHandler");
const productRouter = express.Router();
const { productUpload } = require("../middleware/multer");

// Create a new product
productRouter.post(
  "/createProduct",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { email, name, description, category, tags, price, stock } = req.body;
    const images = req.files.map((file) => file.path);
    console.log(email, name, description, category, tags, price, images);

    if (!email || !name || !description || !category || !tags || !price || !images || !stock) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User does not exist", 404));
    }

    let product = new ProductModel({ email, name, description, category, tags, price, images, stock });

    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  })
);

// Get all products
productRouter.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    const products = await ProductModel.find();
    res.status(200).json({
      success: true,
      products,
    });
  })
);

module.exports = productRouter;