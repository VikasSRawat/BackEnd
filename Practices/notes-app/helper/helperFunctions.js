import { Note } from "../Models/Notes.Model.js";

export const returnToEditPage=async(res,title,message)=>{
    res.render("edit",{note : await Note.findOne({title:title}) ,message:message});
}
