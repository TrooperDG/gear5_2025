import OtpCache from "../../models/temp/otpCache.model.js";
import bcrypt from "bcryptjs";
import {
  asyncHandler,
  responseHandler,
  errorHandler,
  sendEmail,
} from "../../utilities/index.js";

const sendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new errorHandler("Email is required", 400));
  }

  const exisitngOtp = await OtpCache.findOne({ email });
  if (exisitngOtp) {
    const now = new Date();
    const timeLeft = exisitngOtp.expiry.getTime() - now.getTime();

    if (timeLeft > 0) {
      return responseHandler(res, 400, {
        message: `OTP already sent to ${email}`,
        resendAfter: Math.ceil(timeLeft / 1000), // in seconds
      });
    } else {
      await OtpCache.deleteOne({ _id: exisitngOtp._id });
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  const expiry = newDate(Date.now() + 10 * 60 * 1000);
  await OtpCache.create({ email, otp: hashedOtp, expiry });

  await sendEmail(email, "Your OTP", `Here is your OTP: ${otp}`);
  return responseHandler(res, 200, {
    message: `OTP sent to your email ${email}`,
  });
});

export { sendOtp };
