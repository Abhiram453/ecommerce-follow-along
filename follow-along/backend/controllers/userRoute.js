let express = require("express");
const { UserModel } = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("./utils/errorhandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
let userRoute = express.Router();
const upload = require("../middleware/multer");
require("dotenv").config();

const port = process.env.PORT;

userRoute.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      next(new Errorhandler("name, email, and password required", 400));
    }
    let user = await UserModel.findOne({ email: email });
    if (user) {
      next(new Errorhandler("user already exists", 400));
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        next(new Errorhandler("server error", 500));
      }
      let newUser = new UserModel({ name, email, password: hash });

      let token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 60 * 5,
      });
      let PORT = process.env.PORT;
      let activation_url = `http://localhost:${PORT}/user/activation/${token}`;
      try {
        await sendMail({
          email: newUser.email,
          subject: "Activate your account",
          message: `Hello ${newUser.name}, please click the link to activate your account: ${activation_url}`,
        });
        await newUser.save();
        res
          .status(200)
          .json({ status: true, message: "registration successful" });
      } catch (error) {
        next(new Errorhandler("internal server error", 500));
        console.log(error);
      }
    });
  })
);

userRoute.get(
  "/activation/:token",
  catchAsyncError(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
      next(new Errorhandler("token not found", 404));
    }
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        next(new Errorhandler("token is not valid", 400));
      }

      let id = decoded.id;
      await UserModel.findByIdAndUpdate(id, { isActivated: true });

      res.redirect(`http://localhost:5173/login`);
    });
  })
);

userRoute.post(
  "/upload",
  upload.single("photo"),
  catchAsyncError(async (req, res, next) => {
    if (!req.file) {
      next(new Errorhandler("File not found", 400));
    }

    res.status(200).json("Uploaded");
  })
);

userRoute.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new Errorhandler("email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      next(new Errorhandler("please signup", 400));
    }

    if (!user.isActivated) {
      next(new Errorhandler("please activate your account", 400));
    }
    let isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      next(new Errorhandler("password is incorrect", 400));
    }

    let token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 60 * 24 * 30,
    });
    res.cookie("accesstoken", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: true,
      message: "login successful",
      user: { name: user.name, id: user._id },
    });
  })
);

module.exports = { userRoute };