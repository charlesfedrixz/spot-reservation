const express = require("express");
const adminRoute = express.Router();
const {
  createAdmin,
  login,
  getUser,
} = require("../controllers/adminController.js");

adminRoute.post("/create", createAdmin);
adminRoute.post("/login", login);
adminRoute.post("/adminList", getUser);

module.exports = adminRoute;
