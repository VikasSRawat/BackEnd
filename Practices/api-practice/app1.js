import express from 'express';

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.static("public"));
app.use(express.json());

const campaigns = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `n${i + 1}`,
    email: `n${i + 1}@abc.com`
}));


app.get("/",(req,res)=>{
    res.send("Hi welcome to page");
})

app.get("/campaigns",(req,res)=>{
    const offset = 0;
    const page = parseInt(req.query.page)||1;
    const limit = 5;
    const startIndex = offset + (page-1)*limit;
    const endIndex = startIndex + limit;
    const data = campaigns.slice(startIndex,endIndex);
    return res.send(data);
})

app.listen(PORT,(req,res)=>{
    console.log(`Listening at http://localhost:${PORT}`);
})

