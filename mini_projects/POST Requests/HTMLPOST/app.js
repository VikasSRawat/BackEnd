import http from 'http';
import path from 'path';
import fs from 'fs';


const PORT = "3000";
const filepath = path.join("public","index.html");


const server = http.createServer(async(req,res)=>{
    if(req.method === "GET"){
        if(req.url === "/"){
            fs.readFile(filepath,(err,data)=>{
                if(err){
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end('Servor Error');
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/html'})
                    res.end(data);
                }
            });
        }
        else{
            res.writeHead(404,{'Content-type':'text/plain'})
            res.end("Page Not Found");
        }
    }

    if(req.method === "POST"){
        if(req.url === "/submit"){
            let formData = ''
            req.on("data",(chunks)=>{
                // console.log("Getting the data");
                formData += chunks;
            })
            req.on("end",()=>{
                const parsedData = new URLSearchParams(formData);
                console.log(parsedData.get("Fname"));
                console.log(parsedData.get("lname"));

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Form received. Thank you!');
            })
        }
    }
    // req.end();
});

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})