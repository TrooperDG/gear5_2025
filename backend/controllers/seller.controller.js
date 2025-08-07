import bcrypt from "bcryptjs";
import Seller from "../models/seller.model";
import { asyncHandler, responseHandler, errorHandler } from "../utilities";

//seller auth controllers
const login = asyncHandler(async (req, res, next) => {
  const { businessEmail, password } = req.body;
  //checki valid inputs
  if (!businessEmail || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  //check if customer exists
  const seller = await Seller.findOne({ businessEmail });
  if (!seller)
    return next(new errorHandler("Email or Password is Invalid!", 401));

  const isValidPassword = await bcrypt.compare(password, seller.password);

  //send response
  if (isValidPassword) {
    const token = tokenGenerator(seller._id);
    cookieSender(res, token);
    responseHandler(res, 200, {
      message: "Seller logged in successfully",
      seller,
      token,
    });
  } else {
    return next(new errorHandler("Email or Password is Invalid!", 401));
  }
});

const register = asyncHandler(async (req, res, next) => {
  const {
    businessEmail,
    password,
    bussinessName,
    address,
    gstNumber,
    panNumber,
    taxType,
    bankDetails,
    otp,
  } = req.body;

  if (!businessEmail || !password || !bussinessName || !otp) {
    return next(new errorHandler("Required fields missing", 400));
  }

  const existingSeller = await Seller.findOne({ businessEmail });
  if (existingSeller) {
    return next(new errorHandler("Seller with this email already exists", 409));
  }

  //otp verification-----------
  const otpRecord = await OtpCache.findOne({ email: businessEmail });
  if (!otpRecord || otpRecord.expiry < Date.now()) {
    return next(new errorHandler("Invalid or expired Otp", 400));
  }
  const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
  if (!isValidOtp) {
    return next(new errorHandler("Invalid Otp", 400));
  }
  //------------------------

  const hashedPassword = await bcrypt.hash(password, 10);
  const newSeller = await Seller.create({
    businessEmail,
    password: hashedPassword,
    bussinessName,
    address,
    gstNumber,
    panNumber,
    taxType,
    bankDetails,
  });

  return responseHandler(res, 201, {
    message: "Seller created successfully",
    seller: newSeller,
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const sellerId = userId;
  const updates = req.body;

  // Block sensitive fields from being updated here
  const blockedFields = ["password", "isApproved", "businessEmail"];
  for (const field of blockedFields) {
    if (updates.hasOwnProperty(field)) {
      return next(new errorHandler(`Cannot update field: ${field}`, 400));
    }
  }

  const updatedSeller = await Seller.findByIdAndUpdate(sellerId, updates, {
    new: true,
    runValidators: true,
  });

  return responseHandler(res, 200, {
    message: "Seller profile updated successfully",
    seller: updatedSeller,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  cookieSender(res, "", true);
  responseHandler(res, 200, "Seller logged out succesfully");
});

//-------------------------------------------------------------

const getSeller = asyncHandler(async (req, res, next) => {
  const sellerId = req.userId;
  const seller = await Seller.findById(sellerId);

  if (!seller) {
    return next(new errorHandler("Seller not found", 404));
  }
  return responseHandler(res, 200, seller);
});
const getAllSellers = asyncHandler(async (req, res, next) => {
  const sellers = await Seller.find({});

  if (customers.length < 1) {
    return next(new errorHandler("Sellers not found", 404));
  }
  return responseHandler(res, 200, sellers);
});

export { login, register, updateProfile, logout, getSeller, getAllSellers };
