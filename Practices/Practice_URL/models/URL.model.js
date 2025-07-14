import { mongoose } from 'mongoose';


const URLSchema = new mongoose.Schema({
    originalUrl : {type : String,required : true, unique : true},
    shortCode : {type : String,required : true, unique : true},
    createdAt : {type : Date, default : Date.now()}
});

export const Url = mongoose.model("Url",URLSchema);