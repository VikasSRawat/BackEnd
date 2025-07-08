import  express, { urlencoded }  from 'express';
import dotenv from "dotenv";
import {shortenerRoutes} from './routes/Shortener.Routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(urlencoded({extended:true}));

app.use(shortenerRoutes)

app.set("view engine","ejs");


app.listen(PORT,()=>{
    console.log(`Listening at PORT http://localhost:${PORT}`);
})
