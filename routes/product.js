import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const product = express.Router();

product.get("/", getProducts);
product.post("/new", addProduct);
product.put("/:id", updateProduct);
product.get("/:id", getProduct);
product.delete("/:id", deleteProduct);

export default product;
