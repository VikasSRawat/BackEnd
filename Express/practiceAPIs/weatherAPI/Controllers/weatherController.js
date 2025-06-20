export const getWeatherData = async(req,res)=>{
    const data = req.body;
    const url = `${process.env.base_url}?q=${data.city}&appid=${process.env.API_key}&units=metric`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return res.render("weather",{data:data,city:null});
    }catch(err){
        console.error("An error has occured while trying to fetch the data from the API ",err);
        return res.render("weather",{data : null,invalidCity:true});
    }
}


export const showWeatherPage = async(req,res)=>{
    return res.render("weather", {data : null,city:null});
}