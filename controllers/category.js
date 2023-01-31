import express from "express";
import Category from "../schema/category.js";
import Mongoose from "mongoose";
import { validateCategory } from "../validations/category.js";

export const getAllCategory = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const count = await Category.countDocuments();
    Category.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((result) => {
        res
          .status(200)
          .json({ categories: result, total: count, page: parseInt(page) });
      });
  } catch (err) {}
};
export const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Category Id is invalid" });
    } else {
      Category.findById(id)
        .then((re) => {
          if (re) {
            res.status(200).json(re);
          }
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    }
  } catch (err) {}
};
export const newCategory = async (req, res) => {
  try {
    const { errors, isValid } = validateCategory(req.body);
    if (isValid) {
      Category.findOne({
        name: req.body.name,
      }).then((category) => {
        if (category) {
          res.status(400).json({ message: "This category already exist" });
        } else {
          const newCategory = new Category(req.body);
          newCategory
            .save()
            .then((category) => {
              if (category) {
                res
                  .status(200)
                  .json({ message: "Category saved successfully" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      res.status(422).json(errors);
    }
  } catch (err) {}
};

export const updateCategory = async (req, res) => {
  try {
    const { errors, isValid } = validateCategory(req.body);
    if (isValid) {
      Category.findOne({
        name: req.body.name,
      }).then((category) => {
        if (category) {
          res.status(400).json({ message: "This category already exist" });
        } else {
          const { id } = req.params;
          if (!Mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Category Id is invalid" });
          } else {
            Category.findByIdAndUpdate(id, req.body, { new: true }).then(
              (category) => {
                if (category) {
                  res
                    .status(200)
                    .json({ message: "Category successfully Updated" });
                }
              }
            );
          }
        }
      });
    }
  } catch (err) {}
};
