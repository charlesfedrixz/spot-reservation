import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import asyncHandler from "express-async-handler";

const isAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log("Invaid token : ", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

export default isAdmin;
