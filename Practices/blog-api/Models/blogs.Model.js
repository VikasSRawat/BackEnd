import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title : {type:String,required:true},
    content:{type:String,required:true},
    author : {type:String,required:true},
    tags : {type : Array}
},{
    timestamps:true
});


export const blog = mongoose.model("blogs",blogModel);