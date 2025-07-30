import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { errorResponse, successResponse } from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";

export const userRegister = asyncHandler(async (req, res) => {
  try {
    const { number, password, email, name } = req.body;
    if (!number || !password || !email || !name)
      return errorResponse(res, 400, "Please provide all required details.");

    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return successResponse(res, 200, "User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      number,
      password: hashedPassword,
      email,
      name,
    });
    return successResponse(res, 200, newUser, "User  created successfully.");
  } catch (error) {
    console.error("User registration failed:", error);
    return errorResponse(res, 500, "Registration failed. Please try again.");
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  try {
    const { number, password } = req.body;
    if (!number || !password) {
      return errorResponse(res, 400, "Please provide a number and password.");
    }
    const user = await User.findOne({ number }).select("+password");
    if (!user) {
      return errorResponse(res, 404, "User not found.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid password.");
    }

    user.active = true;
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    req.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return successResponse(res, 200, null, "User logged in successfully.");
  } catch (error) {
    console.error("User Login failed:", error);
    return errorResponse(res, 500, "Login failed. Please try again.");
  }
});
export const userLogout = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return errorResponse(res, 400, "No active  session found");
    }

    await User.findByIdAndUpdate(userId, { active: false });

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });
    return successResponse(res, 200, null, "User  logged out successfully.");
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse(res, 500, "Logout failed due to server error.");
  }
});

export const userDelete = asyncHandler(async (req, res) => {
  if (!req.user.userId) {
    return errorResponse(res, 401, "Unauthorized. Please log in.");
  }
  if (req.user.userId.role !== "superAdmin") {
    return errorResponse(res, 403, "Only super Admin can delete users.");
  }
  const { userId } = req.params;
  if (!userId) {
    return errorResponse(res, 400, "Please provide a number.");
  }

  const user = await User.findOneAndDelete({ userId });
  if (!user) {
    return errorResponse(res, 404, "User not found.");
  }
  return successResponse(res, 200, null, "User deleted successfully.");
});

export const userEdit = asyncHandler(async (req, res) => {
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

export const userList = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  if (!users || users.length === 0) {
    return errorResponse(res, 404, "No users found.");
  }
  return successResponse(res, 200, users, "Users retrieved successfully.");
});

export const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found");

    const otp = generateOTP();
    // const hashed = hashOTP(otp);

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 mins

    // await adminUser.save({ validateBeforeSave: false });
    await user.save();

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    return successResponse(res, 200, null, "OTP sent successfully");
  } catch (error) {
    console.error("Send otp error:", error);
    return errorResponse(res, 500, "Send Otp failed due to server error.");
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp) return errorResponse(res, 400, "Invalid OTP");

    if (user.otp !== otp) {
      return errorResponse(res, 400, "OTP incorrect");
    }
    if (Date.now() > user.otpExpire) {
      return errorResponse(res, 400, "OTP expired");
    }
    user.isOTPVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
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

export const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { name, newPassword } = req.body;
    if (!name || !newPassword)
      return errorResponse(res, 400, "Please provide a name!");
    const searchUser = await User.findOne(name);
    if (!searchUser) return errorResponse(res, 404, "No user found");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    searchUser.password = hashedPassword; // This line overwrites the old password
    await searchUser.save();
    return successResponse(res, 200, null, "Password updated successfully");
  } catch (error) {
    console.log("Failed to set new password: ", error);
    return errorResponse(
      res,
      500,
      "Failed to set new password due to server error!"
    );
  }
});
