const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoute = require("./Routes/adminRoute.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const connectDB = require("./config/db.js");
const userRoute = require("./Routes/userRoute.js");

// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//databse connection
connectDB();
//proctected route
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
//root route
app.get("/", (req, res) => {
  return res.send("Server is running");
});
//to handle error
app.use(errorHandler);

//server listening
const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(
    `Server of your spot-reservation is running on http://localhost:${port}`
  );
});
