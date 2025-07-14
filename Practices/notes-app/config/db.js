import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Successful");
  } catch (err) {
    console.error("Error while connecting to the database\n", err);
  }
};
