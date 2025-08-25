import express from "express";
import multer from "multer";
import {
  createTurf,
  deleteTurf,
  turfList,
  updateTurf,
} from "../controllers/turfController.js";
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
turfRoutes.delete("/deleteTurf/:turfId", isAdmin, deleteTurf);
turfRoutes.put("/editTurf/:turfId", isAdmin, updateTurf);

export default turfRoutes;
