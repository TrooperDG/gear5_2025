import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    parentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentOrder",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
        quantity: Number,
        priceAtPurchase: Number,
        sku: String,
        image: String,
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    logistics: {
      trackingId: String,
      carrier: String,
      expectedDelivery: Date,
    },
    invoiceUrl: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);
export default Order;
