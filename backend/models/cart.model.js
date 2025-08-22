import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    products: {
      type: [
        {
          quantity: { type: Number, required: true, min: 1 },
          variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
