const fs = require("fs");
const path = require("path");


//TODO : Each command should be executed seperately i.e., first check if a file being created at line 11 effects the next command

//! FileWriteSync is used for writing into files
//! This will write the file synchronously and will automatically make a file if its not there. Also it will overwrite the data if the file already exists. 

//? let fileName = "test.txt";
//? let writeFile = fs.writeFileSync(fileName,"This is data to be written synchrnously 2","utf-8");
//? console.log(writeFile);
//* if the filepath is not given then the file will be created whereever the user's current directory position is
//* i.e., in this case if user is in FS Module folder then the file will be created in FS Module folder
//* But if the user is in Modules(parent) folder then the file will be created in Modules(parent) folder.


//* Here we are also using the path module to mention the exact path where the file is to be created
 fileName = "test.txt";
 const filepath = path.join(__dirname,fileName);
//? writeFile = fs.writeFileSync(filepath,"This is data to be written synchrnously 3","utf-8");
//? console.log(writeFile);


//! FileReadSync is used for reading files

//? let readFile = fs.readFileSync(filepath,"utf-8");
//? console.log(readFile);


//! FileAppendSync is used for appending data to the file
//! This will just appned the data to the end of the file i.e., where the cursor was and will automatically create a file if its not there

//? let appendFile = fs.appendFileSync(filepath,"\nNow I am appending new data2","utf-8");
//? console.log(appendFile);




//! FileDeleteSync is used for deleting files
//! First we will create a new file and then delete it. One at a time or else we won't be able to see it

//? let newFile = "test2.txt";
//? const newFilePath = fs.writeFileSync(newFile,"This is data to be written synchrnously 4","utf-8");
//? console.log(newFilePath)

//? const delfile = fs.unlinkSync(newFile);
//? console.log(delfile);


//! File RenameSync is used for renaming the file
 const renameFile = fs.renameSync("data.txt","data1.txt");
 console.log(renameFile);


//* Only write, append and read commands require the data format to be specified