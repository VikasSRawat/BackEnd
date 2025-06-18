import express from 'express';

const API_key = '03322d4f0fd8987c7cc6de6acc9e766d';
const base_url = `https://api.openweathermap.org/data/2.5/weather`

const app = express();

let url = '';

app.get("/weather",async(req,res)=>{
    const city = req.query.city;
    if(city === undefined)
        return res.status(400).send("Please Enter the city name");
    const url = base_url + `/?q=${city}&appid=${API_key}&units=metric`; 
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        // console.log(JSON.parse(response.body));
        res.send("<h1>Welcome to the weather</h1>");
    }
    catch(error){
        console.log("Error fetching the response ",error);
        return res.status(500).send("Internal Server Error\nSorry for the incovenience");
    }
})


app.listen(3000,()=>{
    console.log("Listening to the console");
})