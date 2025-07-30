import express from "express";
import multer from "multer";
import { createTurf, turfList } from "../controllers/turfController.js";
import isAdmin from "../middleware/adminAuth.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
});
const turfRoutes = express.Router();

// Simplified route with upload middleware and controller
turfRoutes.post("/create", isAdmin, upload.array("image", 5), createTurf);
turfRoutes.get("/getTurf", isAdmin, turfList);

export default turfRoutes;
