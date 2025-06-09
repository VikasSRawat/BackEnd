import https from 'https';
import readline from 'readline';


const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout 
});

const apikey = "71193a7bf2ad43fa63c52391";
const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;


const getExchangeRate = (currency) => {
    https.get(url,(response)=>{
        let body =  "";
        response.on('data',(chunk)=>{
            body += chunk;
        });

        response.on('end',()=>{
            // console.log(body);
            const rates = JSON.parse(body).conversion_rates;
            rl.question("Enter the amount you want to convert: ", (amount) => {
                rl.question("Enter the currency you want to convert to (e.g., EUR, GBP, INR): ",(currency)=>{
                    const rate = rates[currency.toUpperCase()];
                    if(rate){
                        const convertAmount = (amount * rate).toFixed(2);
                        console.log(`The converted amount is ${convertAmount} ${currency.toUpperCase()}`);
                    }
                    else{
                        console.log(`Currency ${currency} not found.`);
                    }
                    rl.close();
                });
            })   
            
        })
    })
}

getExchangeRate();