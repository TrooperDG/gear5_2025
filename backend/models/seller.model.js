import mongoose from "mongoose";

const sellerModel = new mongoose.Schema(
  {
    businessEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bussinessName: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      landmark: String,
      houseNo: String,
      city: String,
      state: String,
      pincode: String,
    },
    gstNumber: {
      type: String,
      required: false,
    },

    panNumber: {
      type: String,
      required: false,
    },

    taxType: {
      type: String,
      enum: ["inclusive", "exclusive"],
      default: "inclusive",
    },

    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      upiId: String,
    },

    isApproved: {
      type: Boolean,
      default: false, // admin must verify sellers manually
    },
  },

  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerModel);
export default Seller;
