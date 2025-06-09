import  {readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = join(__dirname,"notes.json");

const writetofile = async (filepath,data)=>{
    try{
        await writeFile(filepath,JSON.stringify(data));
        console.log("File written successfully");
    }
    catch(error){
        console.error("Error writing to file",error);
    }
}
const readfromfile = async(filepath)=>{
    try{
        const data = await readFile(filepath,'utf-8');
        return JSON.parse(data);
    }
    catch(err){
        if(err.code === "ENOENT"){
            console.log("File does not exist, creating the file");
            await writetofile(filepath,[]);
            return [];
        }else{
            console.error("Error reading from the file",err)
        }
    }
}


const Menu = async ()=>{
    const command = process.argv[2];
    if(command === "add"){
        let todo = await readfromfile(filepath);
        let title = process.argv[3];
        let body = process.argv[4];
        let status = "pending";
        let createdAt = new Date().toISOString();
        const newTask = {title,body,status,createdAt};
        todo.push(newTask);
        writetofile(filepath,todo);
    }
    else if(command === "list"){
        let list = await readfromfile(filepath);
        for(let i = 0 ; i < list.length ; i++){
            const task = list[i];
            console.log(i+1);
            console.log("title : ",task.title);
            console.log("body : ",task.body);
            console.log("status : ",task.status);
            console.log("Created At : ",task.createdAt);
        }
    }
    else if(command === "Mark Complete"){
        const taskNo = process.argv[3];
        let list = await readfromfile(filepath);
        for(let i = 0 ; i < list.length ; i++){
            if(i+1 == taskNo){
                list[i].status = "completed";
                await writetofile(filepath,list);
                break;
            }
        }
    }else if(command === "Delete"){
        const taskNo = process.argv[3];
        let list = await readfromfile(filepath);
        let newList = [];
        for(let i = 0 ; i < list.length ; i++){
            if(i+1 == taskNo){
                continue;
            }
            newList.push(list[i]);
        }
        await writetofile(filepath,newList);
    }else{
        console.log("Please Select the proper menu")
    }
}

Menu();