import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  thumbnail: { type: String, default: "" },
  description: { type: String, default: "" },
  brand: { type: String, default: "" },
  tags: { type: [String], default: [] },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sellerId: {
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
