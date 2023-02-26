import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { statusCodes } from "../constants/status.js";
import { decryptPassword } from "../helpers/cipher.js";
import User from "./schema.js";
import { checkPasswordMatch } from "./middleware.js";

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let pass = "";
      pass = await decryptPassword(password, process.env.PASSWORDKEY);
      const isMatch = await checkPasswordMatch(password, user.password);
      if (isMatch) {
        // Password matches
        const payload = {
          email: user.email,
          id: user.id,
          userName: user.userName,
          name: user.name,
        };
        jwt.sign(
          payload,
          process.env.JWTTOKENSECRET,
          { expiresIn: 36000 },
          (err, token) => {
            if (token) {
              return res.status(statusCodes.ok).json({
                status: true,
                token: token,
                message: "Login Successful",
              });
            } else {
              return res
                .status(statusCodes.internalServerError)
                .json({ message: "Something went wrong while creating token" });
            }
          }
        );
      } else {
        return res
          .status(statusCodes.unauthorized)
          .json({ message: "Incorrect Password" });
      }
    } else {
      return res
        .status(statusCodes.notFound)
        .json({ message: "No users found with this mail id" });
    }
  } catch (err) {
    console.error(err.message);
    return res
      .status(statusCodes.internalServerError)
      .json({ message: err.message });
  }
};

export const handleRegister = async (req, res) => {
  try {
    const { email, userName, name, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(statusCodes.forbidden)
        .json({ message: "User with this email already exist" });
    } else {
      const pass = await decryptPassword(password, process.env.PASSWORDKEY);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          try {
            if (err) {
              return res
                .status(statusCodes.internalServerError)
                .json({ message: err.message });
            } else {
              const newUser = new User({
                email: email,
                password: hash,
                name: name,
                userName: userName,
              });
              const result = await newUser.save();
              if (result) {
                return res
                  .status(statusCodes.ok)
                  .json({ message: "User saved successfully", user: result });
              } else {
                return res
                  .status(statusCodes.badRequest)
                  .json({ message: "Something went wrong" });
              }
            }
          } catch (err) {
            return res
              .status(statusCodes.badRequest)
              .json({ message: err.message });
          }
        });
      });
    }
  } catch (err) {
    return res
      .status(statusCodes.internalServerError)
      .json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, newPassword, oldPassword } = req.body;
    if (userId && newPassword) {
      const user = await User.findById(userId);
      if (user) {
        // TODO: Add the decrpyter to convert the AES string to normal password
        // const newPass = await decryptPassword(
        //   newPassword,
        //   process.env.PASSWORDKEY
        // );
        // const oldPass = await decryptPassword(
        //   oldPassword,
        //   process.env.JWTTOKENSECRET
        // );
        // console.log(newPass, oldPass);
        const isMatch = await checkPasswordMatch(oldPassword, user.password);
        console.log(isMatch);
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, async (err, hash) => {
              if (err) {
                return res
                  .status(statusCodes.internalServerError)
                  .json({ message: err.message });
              } else {
                user.password = hash;
                const response = await user.save();
                res
                  .status(statusCodes.ok)
                  .json({ message: "Password Changed Successfully" });
              }
            });
          });
        } else {
          return res
            .status(statusCodes.unauthorized)
            .json({ message: "Old password does not match" });
        }
      } else {
        return res
          .status(statusCodes.notFound)
          .json({ message: "User not found" });
      }
    }
  } catch (err) {
    return res
      .status(statusCodes.internalServerError)
      .json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.params;
    console.log(limit, page);
    const users=await User.find()
  } catch (err) {}
};
