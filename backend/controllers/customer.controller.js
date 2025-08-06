import bcrypt from "bcryptjs";

import Customer from "../models/customer.model.js";
import OtpCache from "../models/temp/otpCache.model.js";
import {
  asyncHandler,
  cookieSender,
  errorHandler,
  responseHandler,
  tokenGenerator,
} from "../utilities";

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //checki valid inputs
  if (!email || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  //check if customer exists
  const customer = await Customer.findOne({ email });
  if (!customer)
    return next(new errorHandler("Email or Password is Invalid!", 401));

  const isValidPassword = await bcrypt.compare(password, customer.password);

  //send response
  if (isValidPassword) {
    const token = tokenGenerator(customer._id);
    cookieSender(res, token);
    responseHandler(res, 200, { customer, token });
  } else {
    return next(new errorHandler("Email or Password is Invalid!", 401));
  }
});

const register = asyncHandler(async (req, res, next) => {
  const { email, password, name, otp } = req.body;
  if (!email || !password || !name) {
    return next(errorHandler("all fields are required", 400));
  }

  // existing customer--------
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    return next(
      new errorHandler("Customer already exists with this email", 409)
    );
  }

  //otp verification-----------
  const otpRecord = await OtpCache.findOne({ email });
  if (!otpRecord || otpRecord.expiry < Date.now()) {
    return next(new errorHandler("Invalid or expired Otp", 400));
  }
  const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
  if (!isValidOtp) {
    return next(new errorHandler("Invalid Otp", 400));
  }

  //creating the new customer-----------
  const hashedPassword = await bcrypt.hash(password, 10);
  const newCustomer = await Customer.create({
    name,
    email,
    password: hashedPassword,
  });
  return responseHandler(res, 201, newCustomer);
});

export { login, register };
