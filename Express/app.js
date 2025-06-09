//! Creating an Express app 

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
    return res.send("Hello stuupid world!")
})
app.get("/about",(req,res)=>{
    return res.send(`<h1>This is the about page</h1>`)
})
app.get("/urlform",(req,res)=>{
    return res.send(`<div class="container">
      <h1>URL Shortener</h1>
      <form id="shorten-form">
        <div>
          <label for="url">Enter URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <label for="shortCode">Enter shortCode:</label>
          <input type="text" id="shortCode" name="shortCode" />
        </div>
        <button type="submit">Shorten</button>
      </form>

      <h2>Shorten URLs</h2>
      <ul id="shortened-urls"></ul>
    </div>`)
})


//* Similar to nodejs we are starting the server and listening at the specified port
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})