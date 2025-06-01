import {writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesFilePath = path.join(__dirname, 'notes.json');

const readfromFile = async (filePath) => {
    try{
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data);
    }catch(error){
        writeFile(filePath, JSON.stringify([]));
        console.error('File not found, creating a new file:', error);
        return [];
    }
}

const writetoFile = async (filePath, data) => {
    try{
        await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log('File written successfully');
    }catch(error){
        console.error('Error writing file:', error);
    }
}


const task = async()=>{
    try{
        const command = process.argv[2];
        if(command === "add"){
            const title = process.argv[3];
            const body = process.argv[4];
            let list = await readfromFile(notesFilePath);
            list.push({title,body});
            await writetoFile(notesFilePath,list);
        }
        else if(command === "list"){
            const list = await readfromFile(notesFilePath); //await readfromFile();
            console.log(list);
        }
    }
    catch(error){
        console.error('Error:', error);
    }
}


task();
