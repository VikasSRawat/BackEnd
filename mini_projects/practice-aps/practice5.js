import https from 'https';

const url = `https://hp-api.onrender.com/api/characters`
https.get(url,(res)=>{
    let data = '';
    res.on("data",(chunks)=>{
        data += chunks;
    })
    res.on("end",()=>{
        data = JSON.parse(data);
        console.log(data);
    })
})