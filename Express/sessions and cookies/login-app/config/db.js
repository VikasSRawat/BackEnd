import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = 'mongodb://localhost:27017/sessions'
export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection Successful");
  } catch (err) {
    console.error("Error while connecting to the database\n", err);
  }
};
