import mongoose from "mongoose";
// import configDotenv from "dotenv";

const mongoURI = 'mongodb://localhost:27017/sessions';

export const connectDB = async(req,res)=>{
    try {
        const res = await mongoose.connect(mongoURI);
        console.log("Connection successful to the database\n"+res);
    } catch (error) {
        console.error("Error Connecting to the Database");
        process.exit();
    }
}