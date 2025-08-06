import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: String,
    color: String,
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
    thumbnail: { type: String, required: false },
  },
  { timestamps: true }
);

// Prevent same size+color combo for same product
VariantSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true });

const Variant = mongoose.model("Variant", VariantSchema);
export default Variant;
