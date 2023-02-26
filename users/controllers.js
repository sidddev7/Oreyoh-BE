import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { statusCodes } from "../constants/status.js";
import { decryptPassword } from "../helpers/cipher.js";
import User from "./schema.js";
import { checkPasswordMatch } from "./middleware.js";
import { verifyid } from "../helpers/mongoose.js";

export const followers = "followers";
export const following = "following";
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
    const users = await User.find();
  } catch (err) {}
};
export const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, type = followers } = req.query;
    console.log(id, page, limit);
    const user = await User.findById(id)
      .select({
        followers: 1,
        following: 1,
        _id: 0,
      })
      .populate({
        path: `${type}`,
        populate: [
          {
            path: "user",
            model: "Users",
            select: { followers: 0, following: 0, password: 0, __v: 0 },
          },
        ],
      });
    if (user) {
      if (type === followers) {
        return res.status(statusCodes.ok).json({
          message: "Followers retrived successfully",
          followers: user[`${followers}`],
        });
      } else if (type === following) {
        return res.status(statusCodes.ok).json({
          message: "following retrieved successfully",
          following: user[`${following}`],
        });
      }
    } else {
      return res
        .status(statusCodes.notFound)
        .json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    return res
      .status(statusCodes.internalServerError)
      .json({ message: err.message });
  }
};

export const addFollowing = async (req, res) => {
  try {
    const { userId, selectedUserId } = req.body;
    if (userId === selectedUserId)
      return res
        .status(statusCodes.badRequest)
        .json({ message: "Cannot follow own" });
    else {
      // first user starts following second user,
      // so add the second user as following in the collection of first user,
      // check whether the user already follows the second user or not
      const isValidId = await verifyid(selectedUserId, User);
      if (isValidId) {
        const user = await User.findById(userId).select({ following: 1 });
        const index = user.following.findIndex((item) => {
          const idString = `${item}`.split('"')[1];
          return idString === selectedUserId;
        });
        if (index !== -1) {
          // TODO: We can add the remove follower here too
          // return console.log(selectedUserId, userId);
          await User.updateOne(
            { _id: userId },
            { $pull: { following: { user: selectedUserId } } }
          );
          await User.updateOne(
            { _id: selectedUserId },
            { $pull: { followers: { user: userId } } }
          );
          return res
            .status(statusCodes.ok)
            .json({ message: "You have successfully unfollowed this user" });
        } else {
          await User.updateOne(
            { _id: userId },
            { $push: { following: { user: selectedUserId } } }
          );
          await User.updateOne(
            { _id: selectedUserId },
            { $push: { followers: { user: userId } } }
          );
          return res
            .status(statusCodes.ok)
            .json({ message: "You started following" });
          // and first user as follower in the collection of second user
        }
      } else {
        return res
          .status(statusCodes.badRequest)
          .json({ message: "User is invalid" });
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(statusCodes.internalServerError)
      .json({ message: err.message });
  }
};
