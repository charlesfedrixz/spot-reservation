import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      mapLink: {
        type: String,
        required: true,
        trim: true,
        match: [
          /^https:\/\/(www\.)?google\.com\/maps/,
          "Must be a valid Google Maps URL",
        ],
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
    image: [{ type: String, required: true, trim: true }],
    side: {
      type: Number,
      required: true,
      enum: [5, 6, 7, 8, 9, 10, 11],
    },

    timing: {
      start: {
        type: String,
        required: true,
        trim: true,
        match: [
          /^([01]\d|2[0-3]):[0-5]\d$/,
          "Invalid start time format (HH:mm)",
        ],
      },
      end: {
        type: String,
        required: true,
        trim: true,
        match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time format (HH:mm)"],
      },
    },
    prices: {
      hourly: {
        hour: { type: String, required: true, trim: true }, // e.g., "06:00"
        price: { type: Number, required: true, min: 0 },
      },
      event: {
        price: { type: Number, required: true, min: 0 },
        description: { type: String, default: "Event None" },
      },
    },
    aminities: {
      parking: {
        type: Boolean,
        default: false,
      },
      washroom: {
        type: Boolean,
        default: false,
      },
      changingRoom: {
        type: Boolean,
        default: false,
      },
      shop: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Turf = mongoose.model("Turf", turfSchema);
export default Turf;
