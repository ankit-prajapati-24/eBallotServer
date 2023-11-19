const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 4000;

const bodyparser = require("body-parser");

app.use(cookieParser());
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.get("/", (req, res) => {
    res.json({
      message: "Your server is running"
    });
  });
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
