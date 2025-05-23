let express = require("express");
const ProductModel = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const orderRouter = express.Router();
const UserModel = require("../models/userModel");
const auth = require("../middleware/auth");
const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");

// Place Order
orderRouter.post(
  "/place-order",
  auth,
  catchAsyncError(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let userId = req.user_id;

      if (!userId) {
        return next(new ErrorHandler("User ID not found", 400));
      }

      let user = await UserModel.findById(userId);
      let mailId = user.email;
      let userName = user.name;

      const { orderItems, shippingAddress, totalAmount } = req.body;

      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return next(new ErrorHandler("At least one order item is required", 400));
      }

      for (let item of orderItems) {
        if (!item.product || !item.quantity || !item.price) {
          return next(new ErrorHandler("Each order item must include product, quantity, and price", 400));
        }
        if (item.quantity < 1) {
          return next(new ErrorHandler("Quantity cannot be less than 1", 400));
        }
        if (item.price < 0) {
          return next(new ErrorHandler("Price cannot be negative", 400));
        }
      }

      if (
        !shippingAddress ||
        !shippingAddress.country ||
        !shippingAddress.city ||
        !shippingAddress.address ||
        !shippingAddress.pincode ||
        !shippingAddress.addressType
      ) {
        return next(
          new ErrorHandler(
            "All shipping address fields are required (country, city, address, pincode, addressType)",
            400
          )
        );
      }

      if (typeof totalAmount !== "number" || totalAmount <= 0) {
        return next(new ErrorHandler("Total amount must be a positive number", 400));
      }

      const orderPromises = orderItems.map(async (item) => {
        const totalAmount = item.price * item.quantity;
        let newOrder = new orderModel({
          orderItems: [item],
          shippingAddress,
          totalAmount,
          user: userId,
        });
        return newOrder.save({ session });
      });

      await Promise.all(orderPromises);

      await UserModel.findByIdAndUpdate(userId, { cart: [] }, { session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get User Orders
orderRouter.get(
  "/my-order",
  auth,
  catchAsyncError(async (req, res, next) => {
    let userId = req.user_id;
    if (!userId) {
      return next(new ErrorHandler("User ID not found", 400));
    }
    const orders = await orderModel
      .find({
        user: userId,
        orderStatus: { $in: ["Processing", "Shipped"] },
      })
      .populate({ path: "orderItems.product" })
      .select("orderItems shippingAddress totalAmount createdAt orderStatus");

    res.status(200).json({
      success: true,
      message: orders,
    });
  })
);

// Cancel Order
orderRouter.patch(
  "/cancel-order/:id",
  auth,
  catchAsyncError(async (req, res, next) => {
    let id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("Order ID not found", 400));
    }

    await orderModel.findByIdAndUpdate(id, { orderStatus: "Cancelled" });

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  })
);

// Get Orders by User Email
orderRouter.get(
  "/user-orders",
  catchAsyncError(async (req, res, next) => {
    const { email } = req.query;

    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const orders = await orderModel
      .find({ user: user._id })
      .populate({ path: "orderItems.product" })
      .select("orderItems shippingAddress totalAmount createdAt orderStatus");

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No orders found for this user", 404));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  })
);

module.exports = orderRouter;