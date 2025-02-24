const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Please provide your country"]
  },
  state: {
    type: String,
    required: [true, "Please provide your state"]
  },
  district: {
    type: String,
    required: [true, "Please provide your district"]
  },
  pincode: {
    type: Number,
    required: [true, "Please provide your pincode"]
  },
  area: {
    type: String
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please add a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide your password"]
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  address: {
    type: addressSchema
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActivated: {
    type: Boolean,
    default: false
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;