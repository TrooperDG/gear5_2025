import mongoose from "mongoose";
import Product from "../models/product/product.model.js";
import Variant from "../models/product/variant.model.js";
import Category from "../models/product/category.model.js";
// import Seller from "../models/seller.model.js";

import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { responseHandler } from "../utilities/responseHandler.utility.js";
import { generateSKU } from "../utilities/skuGenerator.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const { name, thumbnail, categoryId, description, brand, tags } = req.body;
  const sellerId = req.userId;

  //cheking the required fields
  const requiredFields = { name, thumbnail, categoryId, brand };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return next(new errorHandler(`${field} is required`, 400));
    }
  }

  // Validate catagory ID
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return next(new errorHandler("Invalid category  ID", 400));
  }

  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) return next(new errorHandler("Category not found", 404));

  // Create product
  const newProduct = await Product.create({
    name,
    thumbnail,
    categoryId,
    sellerId,
    description,
    brand,
    tags: Array.isArray(tags) ? tags : [],
  });

  return responseHandler(res, 200, {
    message: "Product added successfully",
    product: newProduct,
    // variants: newVariants,
  });
});

const addVariant = asyncHandler(async (req, res, next) => {
  const {
    variantName,
    description,
    stock,
    MRP,
    sellingPrice,
    images,
    size,
    color,
    variantIndex,
  } = req.body;
  const { productId } = req.params;

  //cheking the required fields
  const requiredFields = { variantName, stock, MRP, sellingPrice, images };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return next(new errorHandler(`${field} is required`, 400));
    }
  }

  if (!productExists) return next(new errorHandler("Product not found", 404));

  const sku = await generateSKU(productExists.brand, variantName);

  const newVariant = await Variant.create({
    productId,
    variantName,
    stock,
    MRP,
    sellingPrice,
    sku,
    description,
    size,
    color,
    variantIndex,
    images: Array.isArray(images) ? images : [],
  });

  return responseHandler(res, 200, {
    message: "Variant added successfully",
    variant: newVariant,
  });
});
export { addProduct };

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// Create variants
// const newVariants = await Promise.all(
//   variants.map(async (variant) => {
//     const sku = await generateSKU(details?.brand, variant.variantName);
//     Variant.create({
//       productId: newProduct._id,
//       ...variant,
//       sku,
//     });
//   })
// );
