import readline from "readline";

//* This line is creating a readline interface, which allows you to read input from the user and write output back to the terminal.
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//* Array to store todo items or tasks
const todos = []; 

//* Function to display the menu options to the user
const showMenu = ()=>{
    console.log("\n1. Add a task");
    console.log("2. View all tasks"); 
    console.log("3. Exit");
    rl.question("\nChoose an option: ",handleInput); //* The .question() method is used to prompt the user for input. It takes two arguments: a string to display as a prompt and a callback function to handle the user's input.
}

const handleInput = (option) => {
    if(option === "1"){
        rl.question("Enter the task: ",(task)=>{
            todos.push(task);
            console.log(`Task "${task}" added successfully!`);
            showMenu();
        })
    }
    else if(option === "2"){
        console.log("\nYour tasks:");
        todos.forEach((element,index) => {
            console.log(`${index + 1} - ${element}\n`);
        });
        showMenu();
    }
    else if(option === "3"){
        console.log("Exiting the program...");
        rl.close();
        //* rl.close() closes the input/output stream created by readline.createInterface().
        //* After calling rl.close(), you can't ask more questions with rl.question() — the interface is shut down.
    }
    else{
        console.log("Invalid option. Please try again.");
        showMenu();
    }
}
showMenu()