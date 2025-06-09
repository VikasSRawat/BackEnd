const fs = require("fs");
const path = require("path");


//! WriteFile is used for writing into files asynchronously without being interrupting anything else
const filename = "asyncdata.txt";
const pathname = path.join(__dirname,filename);
//* Here we have to mention an extra parameter i.e., callback function
//* This is due to aync nature of the function hence nodejs writes the file in background and any error is handled by the callback function
//? const filewrite = fs.writeFile(pathname,"This is data to be written asynchrnously","utf-8",
//?     (err) => {
//?     if(err){
//?         console.error(err);
//?     }else{
//?         console.log("File written successfully");
//?     }
//? });
//?
//? console.log(filewrite);
//* The asynchronous nature can be seen when the console.log(filewrite) is printed before the file is written


//! ReadFile is used for reading files asynchronously without being interrupting anything else
//* We are passing an extra arguement data in the callback function so that the data is stored in it if no error occurs
//? const readFile = fs.readFile(pathname,"utf-8",
//?     (err,data) => {
//?     if(err){
//?         console.error(err);
//?     }else{
//?         console.log(data);
//?     }
//? });
//? console.log(readFile);


//! AppendFile is used for appending data to files asynchronously without being interrupting anything else
//? const appendFile = fs.appendFile(pathname,"\nAppending to the file","utf-8",
//?     (err)=>{
//?         if(err){
//?             console.log(err)
//?         }
//?         else{
//?             console.log("file appended successfully");
//?         }
//?     }
//? )
//? console.log(appendFile);


//! Unlink is used for deleting files asynchronously without being interrupting anything else
//? const unlinkfile = fs.unlink(pathname,
//?     (err)=>{
//?     if(err){
//?         console.log(err);
//?     }
//?     else{
//?         console.log("file deleted successfully");
//?     }
//? })