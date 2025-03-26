let express = require("express");
const UserModel = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
let userRoute = express.Router();
const { upload } = require("../middleware/multer");
const auth = require("../middleware/auth");
const path = require("path");

// User Signup
userRoute.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return next(new ErrorHandler("Name, email, and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return next(new ErrorHandler("Server error", 500));
      }

      let newUser = new UserModel({ name, email, password: hash });

      let token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "1d" });
      let PORT = process.env.PORT;
      let activationUrl = `http://localhost:${PORT}/user/activation/${token}`;

      try {
        await sendMail({
          email: newUser.email,
          subject: "Activate your account",
          message: `Hello ${newUser.name}, please click the link to activate your account: ${activationUrl}`,
        });
        await newUser.save();
        res.status(200).json({ status: true, message: "Registration successful. Please check your email to activate your account." });
      } catch (error) {
        return next(new ErrorHandler("Internal server error", 500));
      }
    });
  })
);

// Account Activation
userRoute.get(
  "/activation/:token",
  catchAsyncError(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
      return next(new ErrorHandler("Token not found", 404));
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("Token is not valid", 400));
      }

      let id = decoded.id;
      await UserModel.findByIdAndUpdate(id, { isActivated: true });

      res.redirect("http://localhost:5173/login");
      res.status(200).json({ status: true, message: "Activation is completed" });
    });
  })
);

// File Upload
userRoute.post(
  "/upload",
  auth,
  upload.single("photo"),
  catchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("File not found", 400));
    }
    const userId = req.user_id;
    if (!userId) {
      return next(new ErrorHandler("User ID not found", 400));
    }
    const fileName = path.basename(req.file.path);
    let updated = await UserModel.findByIdAndUpdate(userId, { profilePhoto: fileName }, { new: true });
    res.status(200).json({ message: updated });
  })
);

// User Login
userRoute.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Please sign up", 400));
    }

    if (!user.isActivated) {
      return next(new ErrorHandler("Please activate your account", 400));
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(new ErrorHandler("Internal server error", 500));
      }
      if (!result) {
        return next(new ErrorHandler("Password is incorrect", 400));
      }

      let token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.cookie("accesstoken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.status(200).json({ status: true, message: "Login successful", token });
    });
  })
);

// Check Login
userRoute.get(
  "/checklogin",
  auth,
  catchAsyncError(async (req, res, next) => {
    let userId = req.user_id;
    if (!userId) {
      return next(new ErrorHandler("User ID not found", 400));
    }
    let user = await UserModel.findById(userId).select("name email role address profilePhoto");
    res.status(200).json({ status: true, message: user });
  })
);

// Add Address
userRoute.put(
  "/add-address",
  auth,
  catchAsyncError(async (req, res, next) => {
    let userId = req.user_id;
    if (!userId) {
      return next(new ErrorHandler("User ID not found", 400));
    }

    const { country, city, address1, address2, zipCode, addressType } = req.body;

    if (!country || !city || !address1 || !zipCode || !addressType) {
      return next(new ErrorHandler("All fields are required: country, city, address1, zipCode, and addressType", 400));
    }

    let user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { address: { country, city, address1, address2, zipCode, addressType } } },
      { new: true }
    );

    res.status(200).json({ status: true, message: user });
  })
);

// Get User Profile
userRoute.get(
  "/profile",
  auth,
  catchAsyncError(async (req, res, next) => {
    const userId = req.user_id;
    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }

    const user = await UserModel.findById(userId).populate("address");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({ status: true, message: user });
  })
);

module.exports = { userRoute };