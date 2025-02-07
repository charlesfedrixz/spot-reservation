const express = require("express");
const adminRoute = express.Router();
const {
  createAdmin,
  login,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/adminController.js");

adminRoute.post("/create", createAdmin);
adminRoute.post("/login", login);
adminRoute.post("/adminList", getUser);
adminRoute.post("/deleteAdmin", deleteUser);
adminRoute.post("/updateAdmin", updateUser);

module.exports = adminRoute;
