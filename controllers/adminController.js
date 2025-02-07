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

module.exports = { createAdmin, login, getUser };
