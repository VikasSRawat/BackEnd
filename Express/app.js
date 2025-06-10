//! Creating an Express app 
import path from 'path';
import express from 'express';
const app = express();

//* Simple example of using .env file to get the port number 
//? const PORT = process.env.PORT;
//* Using manual validation 
//?import {PORT} from "./env.js"
//* Using zod validation
import {PORT} from "./env.js";

//* The app variable holds the created Express app, which you can use to:
//* Define routes - app.get(), app.post(), etc
//* Configure Middleware - app.use()
//* Start the server - app.listen()
app.get("/",(req,res)=>{ //* routing for the home page
    //? console.log(__dirname);
    //? console.log(__filename);
    //* The above 2 don't work in ES Modules
    
    console.log(import.meta.dirname); //* This will give the directory name
    console.log(import.meta.url); //* This will give the complete filepath and name
    
    return res.send("Hi");
})
app.get("/about",(req,res)=>{
    return res.send(`<h1>This is the about page</h1>`)
})

//* Another way to send a file using the path's file name and directory
app.get("/URLShort",(req,res)=>{
  console.log(import.meta.dirname)
  const filepath = path.join(import.meta.dirname,"public","index.html");
  res.sendFile(filepath) //* Note for Sendfile, the path file should be absolute i.e., even though app.js and public are in the same level of Express directory, it still needs the absolute path
});

//* Seperately defined for sending the CSS file
app.get("/style.css",(req,res)=>{
  const filepath = path.join(import.meta.dirname,"public","style.css");
  res.sendFile(filepath);
})




//* Similar to nodejs we are starting the server and listening at the specified port
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})