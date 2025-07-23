import crypto from "crypto";

// Generate random 6-digit alphanumeric OTP
const generateOTP = (length = 6) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
};

// Hash OTP before storing
// const hashOTP = (otp) => {
//   return crypto.createHash("sha256").update(otp).digest("hex");
// };

export default generateOTP;
