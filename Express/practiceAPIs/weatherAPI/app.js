import express from 'express';
import { weatherRoutes } from './routes/weatherRoutes.js';
import 'dotenv/config';


const app = express();

app.use(weatherRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Server is running now ");
})