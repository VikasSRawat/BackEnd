import https from "https";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Readline does not give a promise in return hence we are calling the realine function in a promise itself
const ask = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const fetchData = async (postno) => {
  return new Promise((resolve) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postno}`;
    https.get(url, (res) => {
      let content = "";
      res.on("data", (chunk) => {
        content += chunk;
      });

      res.on("end", () => {
        try {
          if (Object.keys(content).length === 0) {
            console.log(
              "Invalid Post Number, Please enter a valid post number"
            );
          } else {
              //?   return content; 
              //* The above will give an error as we are returning this promise at the top itself and hence just have to resolve the content
            resolve(content);
          }
        } catch (error) {
          console.error("Error getting data");
        }
      });
    });
  });
};
const main = async () => {
  const postno = await ask("Enter the Post Number you want to view : ");
  const content = JSON.parse(await fetchData(postno));
  console.log("The data from the API is");
  console.log("User ID : ", content.userId);
  console.log("ID : ", content.id);
  console.log("Title : ", content.title);
  console.log("body : ", content.body);
  rl.close();
};

main();
