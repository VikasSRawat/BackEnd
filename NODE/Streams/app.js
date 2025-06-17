//! Streams and Buffers

import {createReadStream,createWriteStream} from "fs";
import path from "path";

const inputFilepath = path.join(import.meta.dirname,"input.txt");
const outputFilepath = path.join(import.meta.dirname,"output.txt");


const readableStream = createReadStream(inputFilepath,{
    encoding: "utf-8",
    highWaterMark:16 //* At max 16 bytes will be in stream at a time
});

const writeableStream = createWriteStream(outputFilepath);

//? readableStream.pipe(writeableStream);//* Pipe connects the readable stream to the writeable stream

//* Practical proof of streams and buffers
readableStream.on("data",(chunk)=>{
    console.log("Buffer (chunk) : ",Buffer.from(chunk)); //* Converts chunk to a buffer
    console.log("Recieved Chunk  : ",chunk); //* Logs each 16 byte chunk
    writeableStream.write(chunk); //* Writes each chunk to the output file
    
})