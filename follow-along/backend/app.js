const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const ErrorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");

app.use(cors({
  origin: "http://localhost:5173", // Updated to the correct origin
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const userRouter = require('./controllers/userRoute');
const productRouter = require("./controllers/productRoute");

app.get("/test", async (req, res) => {
  res.send("hello.....");
});

console.log(path.join(__dirname, 'uploadproducts'));

app.use('/profile-photo', express.static(path.join(__dirname, 'uploads')));
app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

app.use("/user", userRouter);
app.use("/products", productRouter);

app.use(ErrorMiddleware);

module.exports = app;