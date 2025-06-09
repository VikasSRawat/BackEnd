import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const fileCreation = ()=> {
    rl.question("Enter the name of the file you want to create: ", (filename) => {
        rl.question("Enter the content of the file: ", (content) => {
            fs.writeFile(`${filename}.txt`,content, (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log("File created successfully!");
                }
                rl.close(); // If there are no more questions to be asked then close the readline interface
            });
        });
    })
}

fileCreation();

