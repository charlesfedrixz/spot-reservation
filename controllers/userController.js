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

const userLogin = asyncHandler(async (req, res) => {
  const { number, password } = req.body;
  if (!number || !password) {
    return errorResponse(res, 400, "Please provide a number and password.");
  }
  const user = await User.findOne({ number });
  if (!user) {
    return errorResponse(res, 404, "User not found.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, 401, "Invalid password.");
  }
  return successResponse(res, 200, "User logged in successfully.");
});

const userDelete = asyncHandler(async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return errorResponse(res, 400, "Please provide a number.");
  }
  const user = await User.findOneAndDelete({ number });
  if (!user) {
    return errorResponse(res, 404, "User not found.");
  }
  return successResponse(res, 200, "User deleted successfully.");
});

const userEdit = asyncHandler(async (req, res) => {
  const { number, newNumber, newPassword } = req.body;
  if (!number || !newNumber || !newPassword) {
    return errorResponse(res, 400, "Please provide all required fields.");
  }
  const user = await User.findOne({ number });
  if (!user) {
    return errorResponse(res, 404, "User not found.");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.number = newNumber;
  user.password = hashedPassword;
  await user.save();
  return successResponse(res, 200, "User updated successfully.");
});

const userList = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  if (!users || users.length === 0) {
    return errorResponse(res, 404, "No users found.");
  }
  return successResponse(res, 200, users, "Users retrieved successfully.");
});

module.exports = { userRegister, userLogin, userDelete, userEdit, userList };
