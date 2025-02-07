const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    image: [{ type: String, required: true }],
    side: {
      type: Number,
      enum: [5, 6, 7, 8, 9, 10, 11],
    },
    washroom: {
      type: Boolean,
      required: true,
      default: false,
    },
    changingRoom: {
      type: Boolean,
      required: true,
      default: false,
    },
    shop: {
      type: Boolean,
      required: true,
      default: false,
    },
    opening: {
      type: String,
      required: true,
    },
    closing: {
      type: String,
      required: true,
    },
    prices: [
      {
        start: { type: String, required: true }, // Time in 12-hour format (e.g., "5 AM")
        end: { type: String, required: true }, // Time in 12-hour format (e.g., "6 PM")
        price: { type: Number, required: true }, // Price for the time range
      },
    ],
    parking: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Turf = mongoose.model("User", turfSchema);
module.exports = Turf;
