import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { errorResponse, successResponse } from "../middleware/errorHandler.js";
import generateOTP from "../utils/otp.js";
import mongoose from "mongoose";
import sendEmail from "../utils/sendEmail.js";

export const createAdmin = asyncHandler(async (req, res) => {
  try {
    const { number, role, email, password, turf } = req.body;
    if (!number || !role || !email || !password || !turf)
      return errorResponse(res, 400, "Please provide all data!");

    if (!mongoose.Types.ObjectId.isValid(turf)) {
      return errorResponse(res, 400, "Please provide a validId!");
    }
    if (await Admin.findOne({ email }))
      return errorResponse(res, 401, null, "User is already created!");

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Admin.create({
      number,
      role,
      email,
      password: hashPassword,
      turf,
    });
    return successResponse(
      res,
      201,
      newUser,
      `${newUser.role} is created successfully.`
    );
  } catch (error) {
    console.error("Create Admin error:", error);
    return errorResponse(res, 500, "Create failed due to server error.");
  }
});

export const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const adminUser = await Admin.findOne({ email });
    if (!adminUser) return errorResponse(res, 404, "User not found");

    const otp = generateOTP();
    // const hashed = hashOTP(otp);

    adminUser.otp = otp;
    adminUser.otpExpire = Date.now() + 5 * 60 * 1000; // 5 mins

    // await adminUser.save({ validateBeforeSave: false });
    await adminUser.save();

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    return successResponse(res, 200, null, "OTP sent successfully");
  } catch (error) {
    console.error("Send otp error:", error);
    return errorResponse(res, 500, "Send Otp failed due to server error.");
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, 400, "Please provide all data!");
    const findUser = await Admin.findOne({ email });
    if (!findUser) return errorResponse(res, 400, "User not found!");

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) return errorResponse(res, 400, "Password is incorrect!");

    findUser.active = true;
    const otp = generateOTP();
    findUser.otp = otp;
    findUser.otpExpire = Date.now() + 5 * 60 * 1000;
    await findUser.save();
    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    return successResponse(res, 200, findUser, "Login successfully");
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, 500, "Login failed due to server error.");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const adminId = req.admin.adminId;
    if (!adminId) {
      return errorResponse(res, 400, "No active  session found");
    }

    await Admin.findByIdAndUpdate(adminId, { active: false });

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });
    return successResponse(res, 200, null, "Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse(res, 500, "Logout failed due to server error.");
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    const adminUser = await Admin.findOne({ email });
    if (!adminUser || !adminUser.otp)
      return errorResponse(res, 400, "Invalid OTP");

    if (adminUser.otp !== otp) {
      return errorResponse(res, 400, "OTP incorrect");
    }
    if (Date.now() > adminUser.otpExpire) {
      return errorResponse(res, 400, "OTP expired");
    }
    adminUser.isOTPVerified = true;
    adminUser.otp = null;
    adminUser.otpExpire = null;
    await adminUser.save();
    const token = jwt.sign(
      {
        adminId: findUser._id,
        turfId: findUser.turf,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    // set the token in the cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
    return successResponse(res, 200, null, "OTP verified successfully");
  } catch (error) {
    console.error("verify otp error:", error);
    return errorResponse(res, 500, "OTP verify failed due to server error.");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.find();
    if (!admin || admin.length === 0) {
      return errorResponse(res, 400, "No Admin Found.");
    }

    return successResponse(res, 200, admin, "List Admin successfully");
  } catch (error) {
    console.error("Get users error:", error);
    return errorResponse(res, 500, "Failed to get users due to server error.");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin")
    return errorResponse(res, 403, "Delete user by Super Admin only!");
  try {
    const id = req.params;
    if (!id) return errorResponse(res, 400, "Please provide email.");

    const findUser = await Admin.findByIdAndDelete(id);
    if (!findUser) return errorResponse(res, 404, "No User Found.");

    return successResponse(res, 200, null, "User Deleted successfully.");
  } catch (error) {
    console.log("Delete Admin failed:", error);
    return errorResponse(res, 500, "Admin delete failed!");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin") {
    return errorResponse(res, 403, "Only super admin can update user data");
  }
  try {
    const { number, role, email, turf } = req.body;
    if (!number || !role || !email || !turf)
      return errorResponse(res, 400, "Please provide all data!");

    const updatedUser = await Admin.findOne({ email });
    if (!updatedUser) return errorResponse(res, 404, "User not found.");

    if (
      updatedUser.number === number &&
      updatedUser.role === role &&
      updatedUser.email === email &&
      updatedUser.turf === turf
    )
      return successResponse(
        res,
        200,
        "No changes detected. User data remains the same."
      );

    const updated = await Admin.findOneAndUpdate(
      { email },
      { number, role, turf },
      { new: true, runValidators: true }
    );
    return successResponse(res, 200, null, "User updated successfully");
  } catch (error) {
    console.log("Update Data failed:", error);
    return errorResponse(res, 500, "Update Data Failed due to server error");
  }
});
