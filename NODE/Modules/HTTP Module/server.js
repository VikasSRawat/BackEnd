const http = require("http");

//* Here server is an object that behaves like an EventEmitter. 
//* The http.Server class inherits from EventEmitter, which means it has all the .on(), .emit(), etc., methods available.
//* The server will listen for incoming requests and based on the request URL, it will respond with different messages.
const server = http.createServer((req,res)=>{
    if(req.url === "/"){ //* Here if the URL is exactly "/" then it is the home page
        res.write("Welcome to the Home page of Vikas Singh Rawat");
        res.end();
    }

    //TODO Here we are seeing how to handle different URLs and send different responses
    else if(req.url === "/about"){ 
        res.setHeader("Content-Type", "text/plain"); //* This is used to set the content type of the response. Here we are setting it to text/plain. Each context type has different ways of showing the data.
        res.write("Welcome to the About page of Vikas Singh Rawat yes yes"); //* This is used for writing the response to the client
        res.end();// * This is used to end the response and send it back to the client
    }
    else if(req.url === "/contact"){ 
        res.writeHead(200,{"Content-Type":"text/plain"}); //* This is used to set the status code and content type of the response. Here we are setting it to 200 OK and text/plain.
        res.write("Welcome to the Contact page of Vikas Singh Rawat");
        res.end();
    }
    else{
        res.write("404 Not Found");
        res.end();
    }
})


const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});