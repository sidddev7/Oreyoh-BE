import express from "express";
import { handleLogin, handleRegister } from "../controllers/users.js";

const users = express.Router();

users.post("/login", handleLogin);
users.post("/register", handleRegister);


export default users;
