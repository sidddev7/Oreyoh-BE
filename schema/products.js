// const mongoose = require("mongoose");
import mongoose from "mongoose";
import Schema from "mongoose";
const productSchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  videoUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
const product = mongoose.model("Product", productSchema);
export default product;
