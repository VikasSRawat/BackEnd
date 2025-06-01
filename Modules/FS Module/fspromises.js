const fs = require("fs");
const path = require("path");

const filename = "fspromises.txt";
const pathname = path.join(__dirname,filename);


//* .then() ensures clear chaining of multiple asynchronous operations
//* .catch() ensures error handling in a cetnralized manner making it easy to debug and manage


//! promises to read the directory and list all the contents in that directory
file = __dirname;

//* .readdir() returns a promise that resolves with an array of file names in the directory
//* The promise is resolved when the directory is successfully read
//? fs.promises.readdir(file)
//? .then((data)=>{
//?     console.log(data);
//? })
//? .catch((err)=>{
//?     console.error(err);
//? })
//? 

//! promises to write a file in the give directory
//* .writeFile() returns a promise that resolves when the file is successfully written
//* The promise is resolved when the file is successfully written
//?fs.promises.writeFile(pathname,"Yo writing this file using promises","utf-8")
//?.then(()=>{
//?    console.log("File written successfully");
//?})
//?.catch((err)=>{
//?    console.error(err);
//?})
//?


//! promises to read a file in the give directory
//* .readFile() returns a promise that resolves with the contents of the file   
//* The promise is resolved when the file is successfully read
//?fs.promises.readFile(pathname,"utf-8")
//?.then((data)=>{
//?    console.log("File read successfully");
//?    console.log(data);
//?})
//?.catch((err)=>{
//?    console.error(err);
//?})


//! promises to append a file in the give directory
//* .appendFile() returns a promise that resolves when the file is successfully appended
//* The promise is resolved when the file is successfully appended

//? fs.promises.appendFile(pathname,"\nYo appending this file using promises","utf-8")
//? .then(()=>{
//?     console.log("File appended successfully");
//? })
//? .catch((err)=>{
//?     console.error(err);
//? })

//* Note that sometimes the append operation is logged before the read operation but this does not mean that
//* readFile will also read the appended data. Think of readFile() like taking a screenshot of the file the moment it begins reading.
//* If appendFile() hasn’t finished by then, the new content won’t be in the file yet, so readFile() won't include it in the result.
//* Node.js doesn’t guarantee which finishes first — it’s asynchronous.
//* The exact order depends on system performance, file size, CPU, disk speed, etc.



//! promises to delete a file in the give directory
//* .unlink() returns a promise that resolves when the file is successfully deleted

fs.promises.unlink(pathname)
.then(()=>{
    console.log("File deleted successfully");
})
.catch((err)=>{
    console.error(err);
})