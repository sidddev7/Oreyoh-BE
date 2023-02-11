import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import dbconfig from "./config/dbConfig.js";
import users from "./users/routes.js";
import PostRouter from "./posts/routes.js";
import { AuthVerify } from "./users/middleware.js";
import RestaurantRouter from "./restaurant/routes.js";

const app = express();
// const routes=require('./routes/posts');
app.use(bodyParser.json());

//DB config
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3500;
//connnect to mongo
// Add environment related db connections here
const db = dbconfig.mongoUrlLocal;
mongoose
  .connect(db)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use("/users", users);
app.use("/post",PostRouter);
app.use("/restaurant",RestaurantRouter);

// page not found error handling  middleware
app.use("*", (req, res) => {
  res.status(404).json({success:0,message:"We didn't find what you are looking for !",data:null});    
});

//close
