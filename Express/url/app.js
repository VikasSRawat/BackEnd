import 'dotenv/config';
import express, { urlencoded } from "express";
import {shortenerRoutes} from "./routes/shorterner.Routes.js";
import { env } from './config/env.js';

// console.log(process.env);


const app = express();

const PORT = env.PORT||3002;

app.use(express.static("public"));
app.use(urlencoded({extended:true}));

app.use(shortenerRoutes);

app.set("view engine","ejs");
//? app.set("views","ejs"); //* If we need to define where the template folder will be custom


app.listen(PORT,()=>{
  console.log("Listening to port");
})