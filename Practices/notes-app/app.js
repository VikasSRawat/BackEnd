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


app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
    // return res.send("Hi");
})