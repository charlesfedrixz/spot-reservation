const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    turfName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Turf_Admin", "Super_Admin"],
      default: "Turf_Admin",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) =>
          /^\S+@(gmail\.com|org\.in|gov\.in|edu\.in|example\.org)$/.test(v),
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      required: true,
      minilength: [6, "minimum password length is 6...."],
    },
    permissions: {
      type: [
        {
          title: String,
          url: String,
          icon: String,
        },
      ],
      default: [],
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpire: {
      type: Date,
    },
    isOTPVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
