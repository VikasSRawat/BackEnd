import https from "https";
import readline from "readline";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("Enter the post number you want to fetch the data from ",(postno)=>{
    const url = `https://jsonplaceholder.typicode.com/posts/${postno}`;

    https.get(url,(res)=>{
        let content = "";
        res.on("data",(chunk)=>{
            content += chunk;
        });

        res.on("end",()=>{
            try{
                content = JSON.parse(content);
                if(Object.keys(content).length === 0)
                    console.log("Invalid PostNumber");
                else{
                    console.log("The data from the API is");
                    console.log("User ID : ",content.userId);
                    console.log("ID : ",content.id);
                    console.log("Title : ",content.title);
                    console.log("body : ",content.body);
                }
            }catch(err){
                console.error(err);
            }
            finally{
                rl.close();
            }
        })
    })
})
