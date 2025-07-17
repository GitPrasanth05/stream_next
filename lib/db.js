import { Mongoose, connect } from "mongoose";
import mongoose from "mongoose";
export let ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("db connected successfully ");
  } catch (error) {
    console.log("error in db connectivity ");

    console.log(error);
  }
};
