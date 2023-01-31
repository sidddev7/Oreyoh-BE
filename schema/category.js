// const mongoose = require("mongoose");
import mongoose from "mongoose";
import Schema from "mongoose";

// const Schema = mongoose.Schema;
// Create Schema
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model("Category", CategorySchema);
export default Category;
