import express from 'express';
import axios from 'axios';


const app = express();

const PORT = 3000;

app.get("/users",async(req,res)=>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
        return res.json(response.data);
        
    } catch (error) {
        console.error('Axios error:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
})



app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
})