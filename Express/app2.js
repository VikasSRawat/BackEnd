import express, { urlencoded } from 'express';
import path from 'path';
const app = express();


//! Form Submission in app.js
const staticPath = path.join(import.meta.dirname, "public1");
app.use("/",express.static(staticPath));

//TODO By default the formdata will send the data using get method i.e., the data will be sent in the query parameters 
//?app.get("/contact",(req,res)=>{
//?    console.log(req.query);
//?    res.send("ok"); //* This will just redirect to a page which will display ok but also will show the query parameters
//?})

//TODO Using the POST method for sending form information
app.use(urlencoded({extended:true}))
app.post("/contact",(req,res)=>{
    console.log(req.body); //* Without  using the urlencoded, it will give undefined
    res.redirect("/");
});
//* With extended:false, it can't completely parse the nested objects
//* { 'user[Name]': 'vi', 'user[message]': 'lkj' }

//* With extended:true
//* { user: { Name: 'vi', message: 'lkj' } 



//! Handling 404 errors i.e., page not found errors
//TODO Sending a normal HTML Message
//? app.use((req,res)=>{
//?     return res.status(404).send("<h1>Page Not found lol</h1>")
//? })
//TODO Sending a HTML file
app.use((req,res)=>{
    return res.status(404).sendFile(path.join(import.meta.dirname,"public1","error.html"));
})

app.listen(3000,()=>{
    console.log("Listening at 3000");
})