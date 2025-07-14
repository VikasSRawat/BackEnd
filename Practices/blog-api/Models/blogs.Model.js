import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
    title : {type:String,required:true,unique:true},
    content:{type:String,required:true},
    author : {type:String,required:true},
},{
    timestamps:true
});


export const blog = mongoose.model("blogs",blogModel);