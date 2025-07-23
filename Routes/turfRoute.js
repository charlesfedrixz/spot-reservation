import express from "express";
import multer from "multer";
import { createTurf } from "../controllers/turfController.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
});
const turfRoutes = express.Router();

// Simplified route with upload middleware and controller
turfRoutes.post("/create", upload.array("image", 5), createTurf);

export default turfRoutes;
