import express, { urlencoded }  from 'express';
import { currencyRoutes } from './Routes/currencyRoutes.js';

const app = express();
const PORT = process.env.PORT||3000;

app.use(urlencoded({extended:true}));
app.use(currencyRoutes);

app.set('view engine','ejs');

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})