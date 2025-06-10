import express from 'express';
import path from 'path';


const staticPath = path.join(import.meta.dirname,"public");
const app = express();

app.use("/public",express.static(staticPath));

app.get("/profile/:username",(req,res)=>{
 //* The colon is only there to signify that this is the dynamic parameter and is actually not present in the URL
//*  Without the colon, Express treats it as a fixed word.
//* /user/id — matches only if the URL is exactly /user/id
//* /user/:id — matches /user/anything
    console.log(req.params);
    res.end(`<h1>My username is ${req.params.username}</h1>`)
})

//* Note: The get should be exactly the same as the URL, if there are segments that don't match or missing/added then that route won't be called

//* For Multiple parameters
app.get("/profile/:username/article/:slug",(req,res)=>{
    console.log(req.params);
    res.end(`<h1>The username is ${req.params.username} and the slug is ${req.params.slug}</h1>`)
})

//* Note if the path contains spaces, then the url will automatically fill it with % symbol and here it will show the space normally

app.listen(3000,()=>{
    console.log("Listening");
    
})