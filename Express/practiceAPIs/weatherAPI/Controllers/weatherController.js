export const getWeatherPage = async(req,res)=>{
    // console.log("Hi reached before fetch");
    const city = req.query.city;
    const url = `${process.env.base_url}?q=${city}&appid=${process.env.API_key}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        // res.redirect("/");
        res.send(data);
        console.log(data);
    }catch(err){
        console.error("An error has occured while trying to fetch the data from the API ",err);
    }
}
