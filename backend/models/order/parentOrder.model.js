import mongoose from "mongoose";

const parentOrderModel = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    totalAmount: Number,
    deliveryCharge: Number,

    payment: {
      method: { type: String, enum: ["COD", "Razorpay"], required: true },
      isPaid: { type: Boolean, default: false },
      paidAt: Date,
      transactionId: String,
    },
    childOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const ParentOrder = mongoose.model("ParentOrder", parentOrderModel);
export default ParentOrder;
