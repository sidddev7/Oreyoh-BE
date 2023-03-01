import express from "express";
import {
  addFollowing,
  changePassword,
  getAllUsers,
  getStats,
  handleLogin,
  handleRegister,
} from "./controllers.js";
import { AuthVerify, AuthVerifyGetLoggedInUser } from "./middleware.js";
import { userValidation } from "./validation.js";

const users = express.Router();
users.get("/me", AuthVerifyGetLoggedInUser);
users.get("/stats/:id", getStats);

users.get("/me", AuthVerifyGetLoggedInUser);
users.get("/", getAllUsers);

users.post("/login", handleLogin);
users.post("/register", userValidation, handleRegister);
users.post("/addFollowing", AuthVerify, addFollowing);

users.put("/change-password", AuthVerify, changePassword);

export default users;
