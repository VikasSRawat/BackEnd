import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
    id : {type:Number,required : true, unique : true},
    title : {type : String, required : true},
    description : {type : String},
    status : {type : String, required : true,enum: ["pending", "in-progress", "completed"]},
    dueDate : {type : Date},
    priority : {type:String,required:true},
    tags : {type : [String]},
    completed : {type : Boolean}
},
{
    timestamps:true
});

export const task = mongoose.model("Tasks",taskModel);