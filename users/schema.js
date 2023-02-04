// const mongoose = require("mongoose");
import mongoose, { Schema } from "mongoose";

// const Schema = mongoose.Schema;
// Create Schema
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is Required"] },
    userName: {
      type: String,
      required: [true, "Post Schema Error :User Name is Required"],
      unique: [true, "Post Schema Error :User name should be unique"],
    },
    email: {
      type: String,
      required: [true, "Post Schema Error :Email is required"],
      unique: [true, "Post Schema Error :Email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Post Schema Error :Password is required"],
    },
    bio: String,
    followers: [
      {
        _id: false,
        user: { type: Schema.Types.ObjectId, ref: "Users" },
      },
    ],
    following: [
      {
        _id: false,
        user: { type: Schema.Types.ObjectId, ref: "Users" },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("Users", UserSchema);
export default User;
