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
    if (!number || !role || !email || !password)
      return errorResponse(res, 400, "Please provide all required data!");

    if (role === "Super_Admin" && turf) {
      return errorResponse(
        res,
        400,
        "Super Admin cannot be associated with a turf!"
      );
    }

    if (role !== "Super_Admin" && !turf) {
      return errorResponse(res, 400, "Turf ID is required for Turf Admin!");
    }

    if (turf && !mongoose.Types.ObjectId.isValid(turf)) {
      return errorResponse(res, 400, "Please provide a valid turf ID!");
    }

    if (await Admin.findOne({ email }))
      return errorResponse(res, 401, null, "User already exists!");

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Admin.create({
      number,
      role,
      email,
      password: hashPassword,
      ...(role !== "Super_Admin" && { turf }),
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

    try {
      await sendEmail(email, otp);
    } catch (emailError) {
      console.error("Failed to send OTP:", emailError);
      // Rollback the OTP changes
      findUser.otp = null;
      findUser.otpExpire = null;
      await findUser.save();
      return errorResponse(res, 500, "Failed to send OTP email");
    }

    return successResponse(res, 200, findUser.email, "Login successfully");
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, 500, "Login failed due to server error.");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const adminId = req.admin._id;
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
        adminId: adminUser._id,
        turfId: adminUser.turf,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    // set the token in the cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return successResponse(
      res,
      200,
      {
        email: adminUser.email,
        role: adminUser.role,
        id: adminUser._id,
        turf: adminUser.turf,
      },
      "OTP verified successfully"
    );
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
    if (!id) return errorResponse(res, 400, "Please provide id.");

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

export const getPermission = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin" && req.admin.role !== "Turf_Admin")
    return errorResponse(res, 400, "Unauthorized to access to get permission!");
  try {
    const AdminId = req.admin._id;
    const admin = await Admin.findById(AdminId);
    if (!admin) return errorResponse(res, 400, "Admin not found!");

    return successResponse(
      res,
      200,
      admin.permissions,
      "Permission list successfully!"
    );
  } catch (error) {
    console.error("Failed to get permission!:", error);
    return errorResponse(
      res,
      500,
      "Get Permission failed due to server error!"
    );
  }
});

// export const addPermission = asyncHandler(async (req, res) => {
//   if (req.admin.role !== "Super_Admin" && req.admin.role !== "Turf_Admin")
//     return errorResponse(res, 400, "Unauthorized to access to add permission!");

//   const { adminId } = req.params;
//   const { permissions } = req.body;
//   if (!permissions)
//     return errorResponse(res, 400, "Please provide a permissions");
//   if (!mongoose.isValidObjectId(adminId)) {
//     return errorResponse(res, 400, "Invalid user ID format");
//   }

//   const admin = await Admin.findById(adminId);
//   if (!admin) return errorResponse(res, 400, "Admin not found!");
//   admin.permissions.push(...permissions);
//   await admin.save();

//   return successResponse(res, 200, null, "Permissions added!");
// });

export const addPermission = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin" && req.admin.role !== "Turf_Admin") {
    return errorResponse(res, 400, "Unauthorized to add permission!");
  }

  const { adminId } = req.params;
  if (!mongoose.isValidObjectId(adminId)) {
    return errorResponse(res, 400, "Invalid user ID format");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) return errorResponse(res, 400, "Admin not found!");

  // Define role-based permissions
  const allPermissions = [
    { id: "dashboard", name: "Dashboard", icon: "BarChart3", section: false },
    { id: "system-header", name: "System Management", section: true },
    {
      id: "user-management",
      name: "User Management",
      icon: "Users",
      section: false,
    },
    {
      id: "roles-permissions",
      name: "Roles & Permissions",
      icon: "Shield",
      section: false,
    },
    {
      id: "system-settings",
      name: "System Settings",
      icon: "Settings",
      section: false,
    },
    { id: "business-header", name: "Business Overview", section: true },
    { id: "analytics", name: "Analytics", icon: "BarChart3", section: false },
    {
      id: "revenue-reports",
      name: "Revenue Reports",
      icon: "IndianRupee",
      section: false,
    },
    { id: "all-turfs", name: "All Turfs", icon: "Building", section: false },
    { id: "operations-header", name: "Operations", section: true },
    {
      id: "support-tickets",
      name: "Support Tickets",
      icon: "Headphones",
      section: false,
    },
    {
      id: "refund-management",
      name: "Refund Management",
      icon: "Banknote",
      section: false,
    },
  ];

  const turfAdminPermissions = [
    { id: "dashboard", name: "Dashboard", icon: "BarChart3", section: false },
    { id: "business-header", name: "Business Overview", section: true },
    { id: "analytics", name: "Analytics", icon: "BarChart3", section: false },
    {
      id: "revenue-reports",
      name: "Revenue Reports",
      icon: "IndianRupee",
      section: false,
    },
    { id: "all-turfs", name: "All Turfs", icon: "Building", section: false },
    { id: "operations-header", name: "Operations", section: true },
    {
      id: "support-tickets",
      name: "Support Tickets",
      icon: "Headphones",
      section: false,
    },
    {
      id: "refund-management",
      name: "Refund Management",
      icon: "Banknote",
      section: false,
    },
  ];

  // Assign based on role
  if (admin.role === "Super_Admin") {
    admin.permissions = allPermissions;
  } else if (admin.role === "Turf_Admin") {
    admin.permissions = turfAdminPermissions;
  }

  await admin.save();

  return successResponse(
    res,
    200,
    admin.permissions,
    `Permissions assigned for role: ${admin.role}`
  );
});

export const deletePermissions = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin") {
    return errorResponse(res, 401, "Unauthorized to delete permissions");
  }

  const { adminId } = req.params;
  if (!adminId) return errorResponse(res, 400, "Please provide a  adminId!");
  if (!mongoose.isValidObjectId(adminId)) {
    return errorResponse(res, 400, "Invalid permission ID format");
  }
  const { permissionIds } = req.body;

  const adminToBeUpdated = await Admin.findById(adminId);
  if (!adminId) return errorResponse(res, 400, "Admin not found!");
  adminToBeUpdated.permissions = adminToBeUpdated.permissions.filter(
    (permission) => !permissionIds.includes(permission._id.toString())
  );
  await adminToBeUpdated.save();
  return successResponse(res, 200, null, "Permissions deleted");
});

export const updatePermissions = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin") {
    return errorResponse(res, 401, "Unauthorized to update permissions!");
  }
  try {
    const { adminId } = req.params;

    if (!mongoose.isValidObjectId(adminId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid permission ID format",
      });
    }

    const { permissions } = req.body;
    if (!permissions)
      return errorResponse(res, 401, "Please provide a permissions!");
    const adminToBeUpdated = await Admin.findById(adminId);
    if (!adminToBeUpdated)
      return errorResponse(res, 401, "Permission not found!");
    adminToBeUpdated.permissions = permissions;
    await adminToBeUpdated.save();

    return successResponse(res, 200, null, "Permissions updated");
  } catch (error) {
    console.error("Failed to update permission!:", error);
    return errorResponse(
      res,
      500,
      "Update Permission failed due to server error!"
    );
  }
});
