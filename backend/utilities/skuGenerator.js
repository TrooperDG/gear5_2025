import Variant from "../models/product/variant.model.js";

async function generateSKU(brand, variantName) {
  try {
    // 1. Brand code (first 3 letters, uppercase, no spaces)
    const brandCode = brand.replace(/\s+/g, "").slice(0, 3).toUpperCase();

    // 2. Variant code (first 3 letters, uppercase, no spaces)
    const variantCode = variantName
      .replace(/\s+/g, "")
      .slice(0, 3)
      .toUpperCase();

    let sku;
    let exists = true;

    // Ensure SKU uniqueness in DB
    while (exists) {
      // 3. Random 4-digit number
      const randomNum = Math.floor(1000 + Math.random() * 9000);

      // 4. Base-36 timestamp
      const timestampCode = Date.now().toString(36).toUpperCase();

      sku = `${brandCode}-${variantCode}-${randomNum}-${timestampCode}`;
      const variant = await Variant.findOne({ sku });
      exists = !!variant;
    }

    return sku;
  } catch (error) {
    throw new Error("Failed to generate SKU");
  }
}

export { generateSKU };
