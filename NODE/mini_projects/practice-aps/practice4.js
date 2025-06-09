import readline from 'readline';
import https from 'https';

const API_key = '03322d4f0fd8987c7cc6de6acc9e766d';
const base_url = `https://api.openweathermap.org/data/2.5/weather`

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout   
})

const ask = (query)=>{
    return new Promise(resolve=>{
        rl.question(query,resolve);
    })
}

const main= async()=>{
    const city = await ask("Please Enter the city of whose weather you want to check  : ");
    const url = `${base_url}/?q=${city}&appid=${API_key}&units=metric`
    https.get(url,(res)=>{
        let data = ''
        res.on("data",(chunks)=>{
            data += chunks;
        })

        res.on("end",()=>{
            try{
                const jsonData = JSON.parse(data);
                if(jsonData.cod === 200){
                    console.log('Weather Description : ',jsonData['weather'][0]['description']);
                    console.log(`Temperature : ${jsonData.main.temp} degree celcius`);
                    console.log(`pressure : ${jsonData.main.pressure} hpa`);
                    console.log(`humidity : ${jsonData.main.humidity} `);
                    console.log(`Visibility : ${jsonData.visibility} meters`);

                    
                }
                else{
                    console.log("Please Enter the correct city name : ");
                }
                rl.close();
            }
            catch(err){
                console.error("An error has occured");
            }
        })
    })
}

main();