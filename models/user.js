import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      match: [/^[a-zA-Z\s]+$/, "Name should contain letters and spaces"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    number: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },
    password: {
      type: String,
      required: true,
      minilength: [6, "minimum password length is 6...."],
      select: false,
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
export default User;
