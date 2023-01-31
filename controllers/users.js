import Mongoose from "mongoose";
import User from "../schema/user.js";
import Express from "express";
import { validateLogin, validateRegister } from "../validations/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
  // check validation
  //   console.log("sadnskkfn", req.body);
  //   res.json(req.body);
  const { errors, isValid } = validateLogin(req.body);
  if (isValid) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
      if (user) {
        // check password
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const payload = {
                email: user.email,
                id: user.id,
              };
              jwt.sign(
                payload,
                "secret",
                {
                  expiresIn: 36000,
                },
                (err, token) => {
                  res.json({ status: true, token: "Bearer " + token });
                }
              );
            } else {
              res
                .status(401)
                .json({
                  message: "Invalid username or password, please try again",
                });
            }
          })
          .catch((err) => res.status(422).json(err));
      } else {
        res.status(401).json({ message: "Email id does not exist" });
      }
    });
    // login
  } else {
    res.status(422).json(errors);
  }
};

export const handleRegister = (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegister(req.body);
  if (isValid) {
    //   register
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.status(400).json({ message: "User already exist" });
      } else {
        //   save to mongoDb
        let encrypt = "";
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            else {
              const newUser = new User({
                email: req.body.email,
                password: hash,
              });
              newUser
                .save()
                .then((user) =>
                  res.status(200).json({ message: "User saved successfully" })
                )
                .catch((err) => {
                  res.status(402).json(err);
                });
            }
          });
        });
      }
    });
  } else {
    res.status(422).json(errors);
  }
};
