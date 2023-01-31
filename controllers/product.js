import product from "../schema/products.js";
import Category from "../schema/category.js";
import { validateProduct } from "../validations/product.js";
import Mongoose from "mongoose";
export const addProduct = async (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (isValid) {
    product.findOne({ product: req.body.product }).then((re) => {
      if (re) {
        res.status(400).json({ message: "Product already exist" });
      } else {
        const newProduct = new product(req.body);
        newProduct
          .save()
          .then((re) => {
            res.status(200).json("Product Saved Successfully");
          })

          .catch((err) => {});
      }
    });
    // logic for saving the product to the db
  } else {
    res.status(422).json(errors);
  }
};
export const updateProduct = async (req, res) => {
  const product_id = req.params.id;
  const { errors, isValid } = validateProduct(req.body);
  if (isValid) {
    // update product
    if (!Mongoose.Types.ObjectId.isValid(product_id))
      return res.status(404).send({ message: "No product with that id" });
    product
      .findByIdAndUpdate(product_id, req.body, { new: true })
      .then((re) => {
        res.status(200).json({ message: "Product updated", re });
      });
  } else {
    res.status(422).json(errors);
  }
};
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "No product with that id" });
  product
    .findByIdAndDelete(id)
    .then((re) => {
      res.status(re === null ? 404 : 200).json({
        message:
          re !== null
            ? "Product deleted Successfully"
            : "No Product found with that id",
      });
    })
    .catch((err) => {
      console.log("called error");
    });
};

export const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    // const count = product.countDocuments();
    const count = await product.countDocuments();
    product
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("category")
      .exec()
      .then((re) => {
        res.status(200).json({ products:re, page: parseInt(page), total: count });
      });
  } catch (err) {}
};

export const getProduct = async (req, res) => {
  const product_id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(product_id))
    return res.status(404).send({ message: "No product with that id" });
  product
    .findOne({ _id: product_id })
    .populate("category")
    .then((re) => {
      res.status(200).json(re);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
