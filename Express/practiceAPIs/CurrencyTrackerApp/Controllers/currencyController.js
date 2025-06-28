import 'dotenv/config';


export const showcurrencyPage = async(req,res)=>{
    return res.render("index",{data:null});
}

export const convertCurrency = async(req,res)=>{
    const new_url = process.env.url + `/${req.body.base_currency}/${req.body.target_currency}`;
    const response = await fetch(new_url);
    const data = await response.json();
    let amount = parseInt(req.body.amount,10);
    let conversionRate = data.conversion_rate;
    let convertedRate = amount*conversionRate;
    console.log(convertedRate);

    const next_url = `https://v6.exchangerate-api.com/v6/71193a7bf2ad43fa63c52391/latest/${req.body.base_currency}`;
    const curr = await fetch(next_url);
    const d = await curr.json();
    let obj = d.conversion_rates;
    let arr = Object.entries(obj);
    arr.sort((a,b)=>a[1]-b[1]);
    
    let convertedRates = arr.map(a => [a[0], a[1] * amount]);
    
    return res.render("results",{data:convertedRate,top_curr:convertedRates});
}
