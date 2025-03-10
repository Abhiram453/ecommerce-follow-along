const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const ErrorMiddleware = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


const uploadDirs = ["uploads", "uploadproducts"];
uploadDirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const userRouter = require("./controllers/userRoute");
const productRouter = require("./controllers/productRoute");

app.get("/test", async (req, res) => {
  res.send("hello.....");
});

console.log("Profile photos stored in:", path.join(__dirname, "uploads"));
console.log("Product photos stored in:", path.join(__dirname, "uploadproducts"));
app.use("/profile-photo", express.static(path.join(__dirname, "uploads")));
app.use("/products-photo", express.static(path.join(__dirname, "uploadproducts")));

// Routes
app.use("/user", userRouter);
app.use("/products", productRouter);

// Error Handling Middleware
app.use(ErrorMiddleware);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app;