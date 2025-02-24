let express = require('express');
let app = express();
app.use(express.json());

let ErrorHandler = require('./utils/errorHandler'); // Corrected import statement
let errorMiddleware = require('./middleware/errorMiddleware');
let asyncError = require('./middleware/asyncErrorCatch');
const userRouter = require('./controllers/userRoute');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5174/",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/user", userRouter);

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

module.exports = app;