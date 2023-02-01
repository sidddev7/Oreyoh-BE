import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

async function passwordhash(resolve, reject) {
  const hashed_pass = await bcrypt.hash(password, saltSecret);
  const valid = await bcrypt.compare(password, hashed_pass);
  if (valid) {
    console.log("GOOD");
  }
}

export const decryptPassword = async (password, key) => {
  try {
    const pass = CryptoJS.AES.decrypt(password, key);
    return pass.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.log(err);
  }
};
