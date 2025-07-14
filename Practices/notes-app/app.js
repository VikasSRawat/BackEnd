import express, { urlencoded } from "express";
import  dotenv  from 'dotenv';
import { NotesRouter } from "./routes/notes.routes.js";
import { connectDB } from "./config/db.js";

connectDB();

dotenv.config();

const PORT = process.env.PORT||3001
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine","ejs");

app.use("/",NotesRouter);

app.use((req,res,next)=>{
    res.status(404).render("pageNotFound");
})

app.use((err,req,res,next)=>{
    res.status(500).send("Try Again later");
})

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
    // return res.send("Hi");
})