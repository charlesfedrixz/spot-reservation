import { errorResponse, successResponse } from "../middleware/errorHandler.js";
import Booking from "../models/booking.js";
import asyncHandler from "express-async-handler";

export const createBooking = asyncHandler(async (req, res) => {
  if (!req.user.userId)
    return errorResponse(res, 403, "Unauthorized for Booking!");
  try {
    const { turfId, userId } = req.params;
    if (!turfId || !userId)
      return errorResponse(res, 400, "Please provide the Id!");

    const { date, slot, side } = req.body;
    if (!date || !slot || !side)
      return errorResponse(res, 400, "Please provide the required data!");

    const booked = await new Booking({
      turf: turfId,
      user: userId,
      date,
      slot,
      side,
    }).save();

    return successResponse(res, 200, null, "Booking successfully!");
  } catch (error) {
    console.log("Failed in create Booking!: ", error);
    return errorResponse(
      res,
      500,
      "Failed to create Booking due to server error!"
    );
  }
});

export const listAllBooking = asyncHandler(async (req, res) => {
  try {
    const list = await Booking.find();
    if (!list || list.length === 0)
      return errorResponse(res, 200, "No Data found!");
    return successResponse(res, 200, list, "Listed all Booking successfully!");
  } catch (error) {
    console.log("Failed to list booking!");
    return errorResponse(
      res,
      500,
      "Failed to list booking due to server error!"
    );
  }
});

export const listBookingThroughTurf = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin" && req.admin.role !== "Turf_Admin")
    return errorResponse(res, 403, "Unauthorized to access");

  try {
    const { turfId } = req.params;
    if (!turfId) return errorResponse(res, 400, "Please provide turf ID!");

    if (!mongoose.Types.ObjectId.isValid(turfId))
      return errorResponse(res, 400, "Invalid Turf ID!");

    const list = await Booking.find({ turf: turfId })
      .populate("user", "name email")
      .populate("turf", "name location");
    if (!list || list.length === 0)
      return errorResponse(res, 404, "No bookings found for this turf!");
    return successResponse(
      res,
      200,
      list,
      "Listed turf bookings successfully!"
    );
  } catch (error) {
    console.error("Failed to list booking!: ", error);
  }
});

export const deleteBooking = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin" && req.admin.role !== "Turf_Admin")
    return errorResponse(res, 403, "Unauthorized to delete the booking!");

  try {
    const { bookId } = req.params;
    if (!bookId) return errorResponse(res, 400, "Please provide a booking Id!");

    const findId = await Booking.findByIdAndDelete(bookId);
    if (!findId) return errorResponse(res, 400, "No Booking found!");

    return successResponse(res, 200, null, "Deleted successfully!");
  } catch (error) {
    console.error("Failed to delete Booking!:", error);
    return errorResponse(res, 500, "Failed to delete due to server error!");
  }
});
