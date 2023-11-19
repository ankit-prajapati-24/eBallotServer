const express = require('express');
const app = express();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const ElectionsRoute = require("./routes/ElectionsRoute");
// const SurveyRoute = require("./routes/SurveyRoute");
const dbconnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const { ConnectCloadinary } = require("./config/Coudinary");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
// const PORT = process.env.PORT || 4000;

// connect database
// dbconnect();

// middleware
const bodyparser = require("body-parser");

app.use(cookieParser());
app.use(bodyparser.json());
app.use(
  cors({
    origin: "https://e-ballot-server.vercel.app/",
    credentials: true
  })
);

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp"
  })
);

// ConnectCloadinary();

// app.use("/api/v1/auth", userRoutes); // Add a leading slash to the routes
// app.use("/api/v1/Services", ElectionsRoute);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/Survey", SurveyRoute);
// app.use("/api/v1/payment", paymentRoutes);

// default route
app.get("/", (req, res) => {
  res.json({
    message: "Your server is running"
  });
});


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
