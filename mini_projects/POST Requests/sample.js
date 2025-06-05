import readline from "readline";
import https from "https";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const main = async () => {
  const name = await ask("Enter your name : ");
  const job = await ask("Enter your job title : ");

  let obj = { name, job };
  const body = JSON.stringify(obj);

  const options = {
    hostname: "reqres.in",
    path: "/api/users",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "x-api-key": "reqres-free-v1",
    },
  };


  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunks) => {
      data += chunks;
    });

    res.on("end", () => {
      console.log(data);
      rl.close();

    });

  });
  req.write(body);
  req.end();
};

main();
