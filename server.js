import dotenv from "dotenv";
dotenv.config();
import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import turfRoutes from "./Routes/turfRoute.js";

//load credentials
const sslOptions = {
  key: fs.readFileSync("./cred/key.pem"),
  cert: fs.readFileSync("./cred/cert.pem"),
};

// Initialize Express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(
  cors({
    origin: ["https://d6edd98dfc1f.ngrok-free.app", "https://localhost:3000"], // Your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  })
);

// database connection
connectDB();

// protected routes
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/turf", turfRoutes);

// root route
app.get("/", (req, res) => {
  return res.send("Spot reservation server is running...");
});

// error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 9090;
// app.listen(port, () => {
//   console.log(
//     `Server of your spot-reservation is running on http://localhost:${port}`
//   );
// });
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
