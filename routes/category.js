import express from "express";
import {
  getAllCategory,
  getCategory,
  newCategory,
  updateCategory,
} from "../controllers/category.js";

const category = express.Router();

category.get("/", getAllCategory);
category.get("/:id", getCategory);
category.post("/new", newCategory);
category.put("/:id", updateCategory);
export default category;
