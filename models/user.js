const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
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
    location: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
