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

// authentication controllers----------------------------
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

  if (!isValidPassword) {
    return next(new errorHandler("Email or Password is Invalid!", 401));
  }

  //send response
  const token = tokenGenerator(customer._id);
  cookieSender(res, token);
  responseHandler(res, 200, {
    message: "Customer logged in successfully",
    customer,
    token,
  });
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

  return responseHandler(res, 201, {
    message: "Customer registered successfully",
    customer: newCustomer,
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const customerId = req.userId;
  const updates = req.body;

  // Block sensitive fields from being updated here
  const blockedFields = ["password", "email"];
  for (const field of blockedFields) {
    if (updates.hasOwnProperty(field)) {
      return next(new errorHandler(`Cannot update field: ${field}`, 400));
    }
  }

  const updatedCustomer = await Seller.findByIdAndUpdate(customerId, updates, {
    new: true,
    runValidators: true,
  });

  return responseHandler(res, 200, {
    message: "Customer profile updated successfully",
    customer: updatedCustomer,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  cookieSender(res, "", true);
  responseHandler(res, 200, "Customer logged out succesfully");
});

//-------------------------------------------------------------

const getCustomer = asyncHandler(async (req, res, next) => {
  const customerId = req.userId;
  const customer = await Customer.findById(customerId);

  if (!customer) {
    return next(new errorHandler("Customer not found", 404));
  }
  return responseHandler(res, 200, customer);
});
const getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find({});

  if (customers.length < 1) {
    return next(new errorHandler("Customers not found", 404));
  }
  return responseHandler(res, 200, customers);
});

export { login, register, updateProfile, logout, getCustomer, getAllCustomers };
