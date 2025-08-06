import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  hasVariants: {
    type: Boolean,
    default: false,
  },

  // for products who has no variants-----------
  MRP: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
  stock: { type: Number, default: 0 },
  images: [String],
  thumbnail: { type: String, required: false },
  sku: {
    type: String,
    required: true,
    unique: true, // Important!
  },
  //-----------------------------------------------

  description: String,
  brand: String,
  tags: [String],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
