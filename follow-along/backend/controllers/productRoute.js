let express = require("express");
const { ProductModel } = require("../models/productModel");
const { UserModel } = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const productRouter = express.Router();
const { productUpload } = require("../middleware/multer");
const path = require("path");
const mongoose = require("mongoose");

productRouter.post(
  "/create-product",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { email, name, description, category, tags, price, stock } = req.body;
    const images = req.files.map((file) => path.basename(file.path));
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

productRouter.get(
  "/allproduct",
  catchAsyncError(async (req, res, next) => {
    let allProduct = await ProductModel.find();
    res.status(200).json({ status: true, message: allProduct });
  })
);

productRouter.delete(
  "/delete/:id",
  catchAsyncError(async (req, res, next) => {
    let id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("ID is not passed", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ObjectId", 400));
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ status: true, message: "Deleted successfully" });
  })
);

productRouter.put(
  "/update/:id",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    let id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("ID is not passed", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ObjectId", 400));
    }

    let { email, name, description, category, tags, price, stock, images } = req.body;
    const imagesArr = req.files.map((file) => path.basename(file.path));
    if (!images) {
      images = [];
    } else {
      images = Array.isArray(images) ? images : [images];
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { email, name, description, category, tags, price, stock, images: [...imagesArr, ...images] },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  })
);

module.exports = productRouter;