import express, { urlencoded } from 'express';
import { weatherRoutes } from './routes/weatherRoutes.js';
import 'dotenv/config';


const app = express();
app.use(urlencoded({extended:true}));

app.use(weatherRoutes);

app.set('view engine','ejs');

app.listen(process.env.PORT,()=>{
    console.log("Server is running now ");
})