import express from 'express';
import axios from 'axios';
import dotenv  from 'dotenv';

dotenv.config();


const app = express();

try {
    const city = "Delhi";
    const url = `${process.env.base_url}?q=${city}&appid=${process.env.API_key}&units=metric`;
    const result = await axios.get(url);
    console.log(result.data.main.temp);
} catch (error) {
    console.error("Error getting data \n",error);
}

app.listen(process.env.PORT,()=>{
    console.log(`Listening on http://localhost:${process.env.PORT}`);
    
});