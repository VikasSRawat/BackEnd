import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
    const url = "https://official-joke-api.appspot.com/random_joke";
//* The https.get method in Node.js is used to send an HTTP GET request to a URL — typically used to retrieve (fetch) data from an API or web server.
//* Think of https.get like asking a website to send you something (like a joke, weather info, news, etc.). You are not sending any data to them — you're just saying:
//* It takes two arguments:
//* The URL you want to fetch from.
//* A callback function that runs when the response starts coming in.
    https.get(url,(response)=>{
        let body = '';
        //* Here data is coming in chunks, so response.on is a readable stream that keeps on reading the chunks of the data
        response.on('data',(chunk)=>{
            body += chunk;
        });
        //* The end event is emitted when there is no more data to be read from the stream. This means that the entire response has been received.S
        response.on('end',()=>{
            const joke = JSON.parse(body);
            // console.log(joke);
            console.log(chalk.blue(`Here\'s a ${chalk.red(joke.type)} joke for you:`));
            console.log(chalk.bold.bgGreen(`${joke.setup}`));
            console.log(chalk.bold.blue.bgYellow(joke.punchline));
        })
        response.on('error',(err)=>{
            console.error(chalk.red('Error fetching joke:', err.message));
        })
    });
}

getJoke();