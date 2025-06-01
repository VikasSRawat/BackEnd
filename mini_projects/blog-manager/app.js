import { promises } from 'dns';
import { readFile,writeFile } from 'fs/promises';
import { dirname,join } from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = join(__dirname,"blogs.json");

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const writetofile = async(filepath,data)=>{
    try{
        await writeFile(filepath,JSON.stringify(data));
        console.log("File Written Successfully");
    }catch(error){
        console.error("Error writing the file");
    }
};
const readfromfile = async(filepath)=>{
    try{
        const data = await readFile(filepath,"utf-8");
        console.log("File read successfully");
        return JSON.parse(data);
    }catch(error){
        if(error.code === "ENOENT"){
            console.log("The file does not exist and hence empty");
            await writetofile(filepath,[]);
        }else{
            console.error("Error reading from file");
        }
    }
};

const ask = (query)=>{
    return new Promise((resolve)=>{
        rl.question(query,resolve);
    })
}

const handleInput = async(option)=>{
    if(option === "1"){
        const blogs = await readfromfile(filepath);
        const title = await ask("Enter the title of your blog ");
        const body = await ask("Enter the content of the blog\n");
        let createdAt = new Date().toISOString();
        let post = {title,body,createdAt};
        blogs.push(post);
        writetofile(filepath,blogs); 
        Menu();
    }else if(option === "2"){
        const blogs = await readfromfile(filepath);
        for(let i = 0 ; i < blogs.length ; i++){
            console.log(i+1);
            console.log(blogs[i].title);
            console.log(blogs[i].body);
            console.log(blogs[i].createdAt);
            console.log("\n");
        }
        Menu();
    }
    else if(option === "3"){
        const blogs = await readfromfile(filepath);
        let flag = 0;
        const postIdentity = await ask("Enter the post number or the post title you want to view");
        const index = blogs.findIndex((blog, i) =>
            postIdentity === String(i + 1) || postIdentity === blog.title
        );
        if (index !== -1) {
            console.log(`\nPost Found:\n${blogs[index].body}`);
        } else {
            console.log("Post not found.");
        }
        Menu();
    }
    else if(option === "4"){
        const blogs = await readfromfile(filepath);
        let flag = 0;
        const newblogs = [];
        const postIdentity = await ask("Enter the post number or the post title you want to view");
        const filtered = blogs.filter((blog, i) =>
            !(postIdentity === String(i + 1) || postIdentity === blog.title)
        );
        if (filtered.length === blogs.length) {
            console.log("❌ No post matched to delete.");
        } else {
            await writetofile(filepath, filtered);
            console.log("🗑️ Post deleted.");
        }
        Menu();
    }
    else if(option === "5"){
        console.log("Exiting....");
        rl.close();
    }else{
        console.log("Invalid option. Please Enter a valid option");
        Menu();
    }
}
const Menu = async()=>{
    // console.log("Enter the Task Number of the task you want to perform");
    console.log("1. Add a blog Post");
    console.log("2. See All blog Posts");
    console.log("3. See a single post by title");
    console.log("4. Deleting a post");
    rl.question("\nEnter the choice number you want to do ",handleInput);    
}
Menu();

