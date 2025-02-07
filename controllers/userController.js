const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  errorResponse,
  successResponse,
} = require("../middleware/errorHandler");

const userRegister = asyncHandler(async (req, res) => {
  const { number, password } = req.body;
  if (!number || !password)
    return errorResponse(res, 400, "Please provide a number.");

  const existingUser = await User.findOne({ number });
  if (existingUser) {
    return successResponse(res, 200, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    number,
    password: hashedPassword,
  });
  return successResponse(res, 200, "User  created successfully.");
});

module.exports = { userRegister };
