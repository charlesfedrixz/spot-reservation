import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (v) => /^[6-9]\d{9}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid 10-digit Indian mobile number.`,
      },
    },
    turf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      //required: true,
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
      trim: true,
      minlength: [6, "minimum password length is 6...."],
    },
    permissions: {
      type: [
        {
          id: String,
          name: String,
          icon: String,
          section: Boolean,
        },
      ],
      default: [],
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

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
