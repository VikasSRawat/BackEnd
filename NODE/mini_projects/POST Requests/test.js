import https from 'https';


//* This is just a test website which we are posting to and hence and authorization code will work
const options = {
    "method" : "POST",
    "hostname" : "httpbin.org",
    "path" : "/post",
    "headers" : {
        "Content-Type" : "application/json",
        "Authorization" : "12345abcde"
    }
}

const data = {"message" : "Hello Vikas"};
const req = https.request(options,(res)=>{
    let content = "";

    res.on("data",(chunks)=>{
        content += chunks;
    })

    res.on("end",()=>{
        console.log(JSON.parse(content));
    })
})

req.write(JSON.stringify(data));
req.end();
