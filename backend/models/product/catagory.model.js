import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
  catagory: {
    type: String,
    required: true,
  },
});

const Catagory = mongoose.model("Catagory", catagorySchema);
export default Catagory;
