import express from 'express';
import  dotenv  from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT||3003
app.use(cors());

const campaigns = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `n${i + 1}`,
    email: `n${i + 1}@abc.com`
}));

app.get("/",(req,res)=>{
    console.log("Hello");
    res.send("<h1>Hi welcome to app2.js</h1>")
})

app.get("/campaigns",(req,res)=>{
    console.log("Hi clicking the button");
    const cursor = parseInt(req.query.cursor);
    const limit = parseInt(req.query.limit);
    console.log(cursor);
    console.log(limit);
    const data = campaigns.slice(cursor,cursor+limit);
    res.send(data);
})

app.listen(port,(req,res)=>{
    console.log(`Listening on http://localhost:${port}`);
})