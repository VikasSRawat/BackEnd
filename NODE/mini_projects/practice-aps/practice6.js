import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req,res)=>{
    const filePath = path.join(__dirname,'index.html');

    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(500,{'content-type ': 'text/plain'});
            res.end("Internal server error");a
        }
        else{
            res.writeHead(500,{'content-type':'text/html'});
            res.end(data);
        }
    })
})

server.listen(3000,()=>{console.log(`Server listening on http://localhost:3000`)})