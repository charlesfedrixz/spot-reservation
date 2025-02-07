const express = require("express");
const { userRegister } = require("../controllers/userController");

const userRoute = express.Router();
userRoute.post("/createUser", userRegister);

module.exports = userRoute;
