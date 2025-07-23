import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import turfRoutes from "./Routes/turfRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// Initialize Express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.listen(port, () => {
  console.log(
    `Server of your spot-reservation is running on http://localhost:${port}`
  );
});
