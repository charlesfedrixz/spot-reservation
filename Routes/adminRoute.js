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
  getPermission,
  addPermission,
  updatePermissions,
  deletePermissions,
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
adminRoute.get("/getPermissions", isAdmin, getPermission);
adminRoute.post("/addPermissions/:adminId", isAdmin, addPermission);
adminRoute.put("/updatePermissions/:adminId", isAdmin, updatePermissions);
adminRoute.delete("/deletePermissions/:adminId", isAdmin, deletePermissions);

export default adminRoute;
