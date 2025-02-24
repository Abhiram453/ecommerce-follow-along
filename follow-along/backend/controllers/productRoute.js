let express = require("express");
const { ProductModel } = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const productRouter = express.Router();
const { UserModel } = require("../model/userModel");
const { productUpload } = require("../middleware/multer");

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


productRouter.get(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  })
);

productRouter.put(
  "/:id",
  productUpload.array("images", 10),
  catchAsyncError(async (req, res, next) => {
    const { name, description, category, tags, price, stock } = req.body;
    const images = req.files.map((file) => file.path);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        tags,
        price,
        stock,
        images,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  })
);

productRouter.delete(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  })
);

module.exports = productRouter;