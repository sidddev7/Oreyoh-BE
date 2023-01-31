// const mongoose = require("mongoose");
import mongoose from "mongoose";

// const Schema = mongoose.Schema;
// Create Schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("users", UserSchema);
export default User;
