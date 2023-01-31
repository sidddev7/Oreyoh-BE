import isEmpty from "is-empty";
import Validator from "validator";

export const validateCategory = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.error = { message: "Category name is required" };
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
