const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin.js");
const {
  errorResponse,
  successResponse,
} = require("../middleware/errorHandler.js");

const createAdmin = asyncHandler(async (req, res) => {
  const { number, role, email, password, turfName } = req.body;
  if (!number || !role || !email || !password || !turfName)
    return errorResponse(res, 400, "Please provide all data!");

  if (await Admin.findOne({ email }))
    return errorResponse(res, 401, null, "User is already created!");

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await Admin.create({
    number,
    role,
    email,
    password: hashPassword,
    turfName,
  });
  return successResponse(
    res,
    201,
    null,
    `${newUser.role} is created successfully.`
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return errorResponse(res, 400, "Please provide all data!");
  const findUser = await Admin.findOne({ email });
  if (!findUser) return errorResponse(res, 400, "User not found!");

  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) return errorResponse(res, 400, "Password is incorrect!");

  return successResponse(res, 200, null, "Login successfully");
});

const getUser = asyncHandler(async (req, res) => {
  const admin = await Admin.find();
  if (!admin || admin.length === 0) {
    return errorResponse(res, 400, "No Admin Found.");
  }

  return successResponse(res, 200, admin, "List Admin successfully");
});

const deleteUser = asyncHandler(async (req, res) => {
  const email = req.body;
  if (!email) return errorResponse(res, 400, "Please provide email.");

  const findUser = await Admin.findOneAndDelete(email);
  if (!findUser) return errorResponse(res, 404, "No User Found.");

  return successResponse(res, 200, "User Deleted successfully.");
});

const updateUser = asyncHandler(async (req, res) => {
  const { number, role, email, turfName } = req.body;
  if (!number || !role || !email || !password || !turfName)
    return errorResponse(res, 400, "Please provide all data!");

  const updatedUser = await Admin.findOne({ email });
  if (!updatedUser) return errorResponse(res, 404, "User not found.");

  if (
    updatedUser.number === number &&
    updatedUser.role === role &&
    updatedUser.email === email &&
    updatedUser.turfName === turfName
  )
    return successResponse(
      res,
      200,
      "No changes detected. User data remains the same."
    );

  const updated = await Admin.findOneAndUpdate(
    { email },
    { number, role, turfName },
    { new: true, runValidators: true }
  );
  return successResponse(res, 200, "User updated successfully");
});

module.exports = { createAdmin, login, getUser, deleteUser, updateUser };
