import express from "express";
import { handleLogin, handleRegister } from "../controllers/users.js";
import { userValidation } from "../validations/users.js";

const users = express.Router();

users.post("/login", handleLogin);
users.post("/register", userValidation, handleRegister);

export default users;
