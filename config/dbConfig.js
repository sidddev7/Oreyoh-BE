import "dotenv/config";
const mongo = {
  mongoURI: process.env.MONGODBLINK,
  mongoUrlLocal: "mongodb://127.0.0.1:27017/oreyoh",
};
export default mongo;
