import express from "express";
import { changePassword, handleLogin, handleRegister } from "./controllers.js";
import { AuthVerify, AuthVerifyGetLoggedInUser } from "./middleware.js";
import { userValidation } from "./validation.js";

const users = express.Router();

users.post("/login", handleLogin);
users.post("/register", userValidation, handleRegister);
users.get("/me", AuthVerifyGetLoggedInUser);
users.put("/change-password", AuthVerify, changePassword);
export default users;
