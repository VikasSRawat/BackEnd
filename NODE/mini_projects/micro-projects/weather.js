//! Using normal readlie (without promises)

//? import readline from 'readline';
//? import https from 'https';

//? const apikey = "03322d4f0fd8987c7cc6de6acc9e766d";
//? const base_url = "https://api.openweathermap.org/data/2.5/weather";


//? const rl = readline.createInterface({
//?     input: process.stdin,
//?     output: process.stdout
//? });

//? const getWeather = (city)=>{
//?     console.log(`Fetching weather data for ${city}...`);
//?     const url = `${base_url}?q=${city}&appid=${apikey}&units=metric`;
//?     https.get(url,(response)=>{
//?         let body = '';
//?         response.on('data',(chunk)=>{
//?             body += chunk;
//?         })
//?         response.on('end',()=>{
//?             // console.log(body);
//?             const weatherData = JSON.parse(body);
//?             console.log("Weather Information");
//?             console.log(`City: ${weatherData.name}`);
//?             console.log(`Temperature: ${weatherData.main.temp}°C`);
//?             console.log(`Weather: ${weatherData.weather[0].description}`);
//?             console.log(`Humidity: ${weatherData.main.humidity}%`);
//?             console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
//?         })
//?     })
//? }

//? rl.question("Enter the city name: ", (city) => {
//?     getWeather(city);
//?     rl.close(); 
//? });


//! With promises and fetch API with the help of async and await

import readline from 'readline/promises';


const apikey = "03322d4f0fd8987c7cc6de6acc9e766d";
const base_url = "https://api.openweathermap.org/data/2.5/weather";


const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


const getWeather = async (city)=>{
    const url = `${base_url}?q=${city}&appid=${apikey}&units=metric`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`${city} not found. Please check the city name.`);
        }
        const weatherData = await response.json();
        console.log("Weather Information");
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp}°C`);
        console.log(`Weather: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
    }catch(error){
        console.error("Error fetching weather data:", error);
        return;
    }
}

const city = await rl.question("Enter the city name: ");
await getWeather(city);
rl.close();