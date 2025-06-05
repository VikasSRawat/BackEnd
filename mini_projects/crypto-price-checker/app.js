import https from "https";
import readline from "readline";

const api_key = "421b6a5d-d8d6-4742-b0a6-8cd593a64006";

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
  const symbol = await ask("Enter the Coin's symbol you want to check : ");
  const currency = await ask("Enter the currency in which you want to check the price in : ");
  let options = {
    hostname: "pro-api.coinmarketcap.com",
    method: "GET",
    path: `/v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${currency}`,
    headers: {
      "X-CMC_PRO_API_KEY": api_key,
      Accept: "application/json",
    },
  };
  const req = https.request(options, (res) => {
    try {
      let content = "";
      res.on("data", (chunks) => {
        content += chunks;
      });

      res.on("end", () => {
        const jsonData = JSON.parse(content);
        console.log("The price is ")
        console.log(jsonData["data"]["BTC"][0]["quote"][currency]["price"]);
        rl.close();
      });
    } catch (error) {
      console.error("Error has occured ", error);
    }
  });

  req.end();
};

main();
