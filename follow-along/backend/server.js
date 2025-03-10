require("dotenv").config();
const app = require('./app');
const connection = require('./db/connection');

const port = process.env.PORT || 4534;

app.get("/testing", async (req, res) => {
  res.send("hello");
});

connection
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(port, () => console.log(`🚀 App is running on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });