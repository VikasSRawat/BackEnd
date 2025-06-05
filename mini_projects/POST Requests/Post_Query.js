import https from 'https';


let options = {
    "method" : "POST",
    "hostname" : "httpbin.org",
    "path" : "/post?userId=123&source=node",
    "headers" :{
        "Content-Type" : "application/json",
        "Authorization" : "12345abcde"
    }
}
const req = https.request(options,(res)=>{
    let content = '';
    res.on("data",(chunks)=>{
        content += chunks;
    })

    res.on("end",()=>{
        let jsonData = JSON.parse(content);
        console.log(jsonData);
    })
})

req.write(JSON.stringify({ "message": "Testing query + POST body"}));
req.end();