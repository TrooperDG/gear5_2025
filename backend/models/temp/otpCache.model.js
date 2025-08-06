import mongoose from "mongoose";

const otpCacheSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  otp: String,
  expiry: Date,
  createdAt: { type: Date, default: Date.now, expires: 600 },
});

const OtpCache = mongoose.model("OtpCache", otpCacheSchema);

export default OtpCache;
