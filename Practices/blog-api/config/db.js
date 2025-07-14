import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful");
  } catch (error) {
    console.error("Error While connecting to the database");
    process.exit(1);
  }
};
