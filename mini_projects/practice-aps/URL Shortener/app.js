import http from 'http';
import { readFile,writeFile } from 'fs/promises';
import path from 'path';
import  crypto  from 'crypto';


const PORT = 3001;
const filepath = path.join("public","index.html");


const loadlinks = async () => {
    try {
        const data = await readFile(path.join("data", "links.json"), "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(path.join("data", "links.json"), JSON.stringify({}));
            return {};
        } else {
            console.error("Failed to load links:", error);
            return {}; // ✅ Add this line
        }
    }
};


const generatecode = (links)=>{
    let flag = 0;
    const code = crypto.randomBytes(5).toString("hex");
    // Here we are checking if the code exists for the URL
    if (Object.keys(links).includes(code)) {
        return generatecode(links); // retry
        flag = 1;
    }
    if(!flag)
        return code;

}

const server = http.createServer(async(req,res)=>{
    if(req.method === "GET"){
        if(req.url === "/"){
            try{
                const data = await readFile(filepath);
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
                const { url } = JSON.parse(content);
                const existingCode = Object.keys(links).find(k => links[k] === url);

                if(existingCode){
                    res.writeHead(400,{"Content-type":"text/plain"});
                    return res.end("Sorry this URL already exists");
                }
                else{
                    let code = generatecode(links);
                    links[url] = code;
                    await writeFile(filepath,JSON.stringify(links));
                    res.writeHead(200,{"Content-type":"application/json"});
                    res.end(JSON.stringify({success:true,code:code}));
                }
            })
        }
    }
})


server.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})