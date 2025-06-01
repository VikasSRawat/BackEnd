const path = require("path")

console.log(__dirname); // For getting the directory name in which the file is present
console.log(__filename); // For getting the file name(includes the directory path)

// ! This will not create a file 'folder/students/data.txt' instead it will just create a filepath not changing any real file or path
const filePath = path.join("folder","students","data.txt"); 
console.log(filePath);


const parseData = path.parse(filePath); // parsing the filepath components which includes all the below path module functions
const resolvedPath = path.resolve(filePath); // absolute path of the file
const extname = path.extname(filePath); //gets extension of the file
const basename = path.basename(filePath); // gets the name of the file
const dirname = path.dirname(filePath); // gets the directory of the file


console.log({parseData,resolvedPath,extname,basename,dirname});