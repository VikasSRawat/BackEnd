import express from "express";
import { connectDB } from "./Config/db.js";
import dotenv from 'dotenv';
import { TasksRouter } from "./Routes/tasks.Routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use(TasksRouter);


const PORT = process.env.PORT;
app.listen(3000,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})