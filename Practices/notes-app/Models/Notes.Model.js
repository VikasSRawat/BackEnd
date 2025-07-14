import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title : {type:String, required : true, unique : true},
    content : {type : String, required : true},
    createdAt : {type : Date, default : Date.now()}
});

export const Note = mongoose.model("Note", notesSchema); //* The Note in the qoutes is the acutall collection name in compass
