import http from 'http';
import { readFile,writeFile } from 'fs';
import path from 'path';
import  crypto  from 'crypto';


const PORT = 3001;
const filepath = path.join("public","index.html");


const loadlinks = ()=>{
    try{
        const data = readFile(path.join("data","links.json"));
        return JSON.parse(data);
    }catch(error){
        if(error.code === "ENOENT"){
            writeFile(path.join("data","links.json"),{});
            return {};
        }
    }
}

const generatecode = (links)=>{
    let flag = 0;
    const code = crypto.randomBytes(5).toString("hex");
    // Here we are checking if the code exists for the URL
    for(let i = 0 ; i < links.length ; i++){
        if(links[i] === code){
            return generatecode();
            flag = 1;
        }
    }
    if(!flag)
        return code;

}

const server = http.createServer(async(req,res)=>{
    if(req.method === "GET"){
        if(req.url === "/"){
            try{
                const data = readFile(filepath);
                res.writeHead(200,{'Content-type':'text/html'});
                res.end(data);
            }catch(err){
                console.error("An error has occured ",err);
                res.writeHead(500,{'Content-type' : 'text/plain'});
            }
        }
    }

    if(req.method === "POST"){
        if(req.url === "/shorten"){
            let content = '';
            req.on("data",chunks=>{
                content += chunks;
            })
            
            req.on("end",async()=>{
                const links = await loadlinks();
                const data = JSON.parse(content)
                if(links[data]){
                    res.writeHead(400,{"Content-type":"text/plain"});
                    return res.end("Sorry this URL already exists");
                }
                else{
                    let code = generatecode(links);
                    links[data] = url;
                    writeFile(filepath,JSON.stringify(links));
                    res.writeHead(200,{"Content-type":"application/json"});
                    res.end(JSON.stringify({success:true,code:code}));
                }
            })
        }
    }
})


server.listen(()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})