// const mongoose = require("mongoose");
import mongoose, { Schema } from "mongoose";

// const Schema = mongoose.Schema;
// Create Schema
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is Required"] },
    userName: {
      type: String,
      required: [true, "User Name is Required"],
      unique: [true, "User name should be unique"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
