import joi from "joi";
import { statusCodes } from "../constants/status.js";

const userSchema = joi.object({
  name: joi
    .string()
    .required()
    .label("Full name")
    .trim()
    .lowercase()
    .regex(/[${};<>`]/, { invert: true })
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    }),
  userName: joi.string().label("User name").required().trim().lowercase(),
  email: joi.string().email().required().lowercase(),
  password: joi.string().required(),
  following: joi.array().items(
    joi
      .string()
      .label("Following user")
      .required()
      .trim()
      .lowercase()
      .regex(/[${};<>`]/, { invert: true })
      .messages({
        "string.pattern.invert.base":
          `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
          " '`' )",
      })
  ),
  followers: joi.array().items(
    joi
      .string()
      .label("Follower")
      .required()
      .trim()
      .lowercase()
      .regex(/[${};<>`]/, { invert: true })
      .messages({
        "string.pattern.invert.base":
          `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
          " '`' )",
      })
  ),
  //   followers: joi.array({}),
});

export const userValidation = async (req, res, next) => {
  try {
    const results = userSchema.validate(req.body);
    if (results.error) {
      return res.status(statusCodes.badRequest).json({
        message: results.error.details[0].message.replaceAll('"', ""),
      });
    } else {
      req.body = results.value;
      next();
    }
  } catch (err) {}
};
