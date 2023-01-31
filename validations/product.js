import isEmpty from "is-empty";
import Validator from "validator";

export const validateProduct = (data) => {
  let errors = {};
  data.product = !isEmpty(data.product) ? data.product : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  // data.image = !isEmpty(data.image) ? data.image : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  if ((data && !data.product) || Validator.isEmpty(data.product)) {
    errors.error = { message: "Product name is Required" };
  }
  if (data.videoUrl !== undefined && !Validator.isEmpty(data.videoUrl)) {
    if (!Validator.isURL(data.videoUrl)) {
      errors.error = { message: "Not a Valid Url" };
    }
  }
  if (data.instagramUrl !== undefined) {
    if (!Validator.isURL(data.instagramUrl)) {
      errors.error = { message: "Not a Valid Url" };
    }
  }

  // if (Validator.isEmpty(data.image)) {
  //   errors.image = { message: "Image field is Required" };
  // }

  if ((data && !data.price) || Validator.isEmpty(data.price)) {
    errors.error = { message: "Product Price is Required" };
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
