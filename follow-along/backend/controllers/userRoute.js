let express = require("express");
const { UserModel } = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");
const { upload } = require("../middleware/multer");
const userRouter = express.Router();

// User Signup
userRouter.post(
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

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new UserModel({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
    const activationUrl = `http://localhost:${process.env.PORT}/user/activation/${token}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click the link to activate your account: ${activationUrl}`,
      });
      await user.save();
      res.status(200).json({ status: true, message: "Registration successful. Please check your email to activate your account." });
    } catch (error) {
      return next(new ErrorHandler("Internal server error", 500));
    }
  })
);

// Account Activation
userRouter.get(
  "/activation/:token",
  catchAsyncError(async (req, res, next) => {
    const token = req.params.token;
    if (!token) {
      return next(new ErrorHandler("Token not found", 404));
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("Token is not valid", 400));
      }

      const id = decoded.id;
      await UserModel.findByIdAndUpdate(id, { isActivated: true });

      res.redirect("http://localhost:5173/login");
      res.status(200).json({ status: true, message: "Activation is completed" });
    });
  })
);

// File Upload
userRouter.post(
  "/upload",
  upload.single("photo"),
  catchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("File not found", 400));
    }

    res.status(200).json("Uploaded");
  })
);

// User Login
userRouter.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Please sign up", 400));
    }

    if (!user.isActivated) {
      return next(new ErrorHandler("Please activate your account", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Password is incorrect", 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
    res.cookie("accesstoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ status: true, message: "Login successful", token });
  })
);
userRouter.get(
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

module.exports = userRouter;