import Mongoose from "mongoose";
export const verifyid = async (id, model) => {
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return false;
  } else {
    const result = await model.findById(id);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
};
