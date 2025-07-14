import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI+"/"+process.env.MONGODB_DATABASE_NAME);
        console.log("MongoDB Connection successful");
    }catch(error){
        console.log("Connection Failed");
        process.exit(1);    
    }
}