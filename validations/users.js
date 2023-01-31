import Validator from "validator";
import isEmpty from "is-empty";

export const validateLogin = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //   email checks
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email is Required";
  } else if (!Validator.isEmail(data.email)) {
    errors.message = "Invalid Email address";
  }

  //   password checks
  if (Validator.isEmpty(data.password)) {
    errors.message = "Password is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateRegister = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //   email checks
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email is Required";
  } else if (!Validator.isEmail(data.email)) {
    errors.message = "Invalid Email address";
  }

  //   password checks
  if (Validator.isEmpty(data.password)) {
    errors.message = "Password is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
