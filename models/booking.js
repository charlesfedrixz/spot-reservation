import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    turf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // or Date if storing full timestamps
      required: true,
    },
    slot: {
      type: String, // e.g., "8AM-9AM"
      required: true,
    },
    side: {
      type: Number,
      required: true,
      enum: [5, 6, 7, 8, 9, 11, 10],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "offline"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
