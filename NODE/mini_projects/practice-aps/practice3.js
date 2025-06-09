import https from "https";
import readline from "readline";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const ask = (query)=>{
    return new Promise((resolve)=>{
        rl.question(query,resolve);
    });
}

const fetchData = (postId)=>{
    return new Promise((resolve)=>{
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
        https.get(url,(res)=>{
            let content = "";
            res.on("data",(chunks)=>{
                content += chunks;
            })

            res.on("end",()=>{
                try{
                    if(Object.keys(content).length === 0){
                        console.log("You have an undefined post ID please enter a valid post ID");
                        main();
                    }
                    else{
                        resolve(JSON.parse(content));
                    }
                }
                catch(error){
                    console.error("An Error has occured ",error);
                }
            })
        })
    })
}

const main = async()=>{
    const postId = await ask("Enter the Post Number of whose comments you want to get : ");
    const content = await fetchData(postId);
    console.log("The contents of the post are ");
    content.forEach(element => {
        console.log("ID : ",element.id);
        console.log("Name : ",element.name);
        console.log("Email : ",element.email);
        console.log("body : ",element.body);
    });
    rl.close();
};

main();