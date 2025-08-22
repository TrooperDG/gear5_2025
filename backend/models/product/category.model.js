import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Catagory", categorySchema);
export default Category;
