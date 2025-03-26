const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const ErrorMiddleware = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Ensure required directories exist
const uploadDirs = ["uploads", "uploadproducts"];
uploadDirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Import Routes
const { userRoute } = require("./controllers/userRoute");
const productRouter = require("./controllers/productRoute");

// Test Route
app.get("/test", async (req, res) => {
  res.send("hello.....");
});

// Static File Serving
console.log("Profile photos stored in:", path.join(__dirname, "uploads"));
console.log("Product photos stored in:", path.join(__dirname, "uploadproducts"));
app.use("/profile-photo", express.static(path.join(__dirname, "uploads")));
app.use("/products-photo", express.static(path.join(__dirname, "uploadproducts")));

// Routes
app.use("/user", userRoute);
app.use("/product", productRouter);

// Error Handling Middleware
app.use(ErrorMiddleware);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app;