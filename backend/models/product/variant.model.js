import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variantIndex: { type: Number, default: 0 }, // for sorting the variants in the frontend
    variantName: { type: String, required: true },

    // product info------------------
    size: { type: String, default: "" },
    color: { type: String, default: "" },
    description: { type: String, default: "" },
    sku: {
      type: String,
      required: true,
      unique: true, // Important!
    },
    stock: { type: Number, default: 0 },
    MRP: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    images: [String],
  },
  { timestamps: true }
);

// Prevent same size+color combo for same product
// VariantSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true });

const Variant = mongoose.model("Variant", VariantSchema);
export default Variant;
