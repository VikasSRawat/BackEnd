const fs = require("fs");
const path = require("path");

const filename = "fsAsyncAwait.txt";
const pathname = path.join(__dirname, filename);

//TODO : In this file we are going to use async/await in order to execute the promises

//* When executing each function in this page, remember to comment out the other functions so that they do not interfere with each other
//* for example in the readfile function 

//! Reading the directory and listing all the contents in that directory
//* Using then and catch
//? fs.promises.readdir(__dirname)
//? .then((data)=>{
//?     console.log(data);
//? })
//? .catch((err)=>{
//?     console.error(err);
//? })
//* Using Async/Await
//? const readDir = async() =>{
//?     try{
//?         const data = await fs.promises.readdir(__dirname);
//?         console.log(data);
//?     }catch(err){
//?         console.error(err);
//?     }
//? }
//? 
//? readDir(); 


//! Writing a file in the given directory

//? const writefile = async() =>{
//?     try{
//?         const data = await fs.promises.writeFile(pathname,"Yo writing this file using async/await", "utf-8");
//?         console.log("File written successfully",data);
//?     }catch(err){
//?         console.error("Error writing data : ",err);
//?     }
//? }
//? 
//? writefile();


//! Reading a file in the given directory

//?const readfile = async()=>{
//?    try{
//?        const data = await fs.promises.readFile(pathname,"utf-8");
//?        console.log("File read successfully : ",data);
//* Since we did not comment out the writefile function then we need to use await here so that it waits for the writefile function to finish
        //? console.log("File read successfully : ",(await data).toString()); 
//?    }
//?    catch(err){
//?        console.error("Error reading data : ",err);
//?    }
//?}

//? readfile();


//! Appending a file in the given directory
//? const appendfile = async()=>{
//?     try{
//?         const data = await fs.promises.appendFile(pathname,"\nYo appending this file using async/await","utf-8");
//?         console.log("File appended successfully : ",data);
//?     }
//?     catch(err){
//?         console.error("Error appending data : ",err);
//?     }
//? }
//? 
//? appendfile();


//! Deleting a file in the given directory
//? const deletefile= async()=>{
//?     try{
//?         const data = await fs.promises.unlink(pathname);
//?         console.log("File deleted successfully : ",data);
//?     }
//?     catch(err){
//?         console.error("Error deleting data : ",err);
//?     }
//? }
//? deletefile();

