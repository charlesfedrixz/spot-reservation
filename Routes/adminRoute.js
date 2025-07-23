import express from "express";
import {
  createAdmin,
  login,
  getUser,
  deleteUser,
  updateUser,
  logout,
  verifyOtp,
  sendOtp,
} from "../controllers/adminController.js";
import isAdmin from "../middleware/adminAuth.js";

const adminRoute = express.Router();
adminRoute.post("/create", createAdmin);
adminRoute.post("/login", login);
adminRoute.post("/sendOTP", sendOtp);
adminRoute.post("/verifyOTP", verifyOtp);
adminRoute.post("/logout", isAdmin, logout);
adminRoute.get("/adminList", getUser);
adminRoute.post("/deleteAdmin", deleteUser);
adminRoute.post("/updateAdmin", updateUser);

export default adminRoute;
