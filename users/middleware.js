import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const AuthVerify = (req, res, next) => {
  if (req?.headers?.authorization) {
    const id = req.headers.authorization.slice(7);
    jwt.verify(id, "secret", (err, decode) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token is Expired, Login again" });
      } else {
        req.body = { ...req.body, userId: decode.id };
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Authentication Token is Invalid" });
  }
};

export const AuthVerifyGetLoggedInUser = (req, res) => {
  if (req?.headers?.authorization) {
    const id = req.headers.authorization.slice(7);
    jwt.verify(id, process.env.JWTTOKENSECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token is Expired, Login again" });
      } else {
        res.status(200).json(decode);
      }
    });
  } else {
    return res.status(401).json({ message: "Authentication Token is Invalid" });
  }
};

export const checkPasswordMatch = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};

export const passwordHash = async (password, res) => {
  try {
    bcrypt.genSalt(10, async (err, salt) => {
      await bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res
            .status(statusCodes.internalServerError)
            .json({ message: err.message });
        } else {
          console.log(hash);
          return hash;
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
