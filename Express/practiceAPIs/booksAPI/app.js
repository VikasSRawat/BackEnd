import express from 'express';

const app = express();
app.use(express.json());

const books = [
    {
        id : 1,
        title : 'Book one'
    },
    {
        id : 2,
        title : 'Book two'
    }
]

app.get("/",(req,res)=>{
    return res.end("<h1>Hi</h1>")
})

app.get("/books",(req,res)=>{
    return res.json(books);
})

app.get("/books/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    try {
        let flag = 0;
        for(let i = 0 ; i < books.length ; i++){
            if(books[i].id == id){
                flag = 1;
                console.log("Sending the book");
                return res.status(200).send(books[i]);
            }
        }
        if(!flag)
            return res.status(404).send("<h1>Please Enter the correct book ID</h1>")
    } catch (error) {
        console.error('An error has occured : ',error);
    }
    
});

app.post("/books",(req,res)=>{
    try {
        const {id,title} = req.body;
        if(id === undefined)
            return res.status(400).send("Id not found in book");
        if(title === undefined)
            return res.status(400).send("title not found in book");
        
        books.push({id,title});
        console.log("Book received:", { id, title });
        return res.status(201).send("Book received");
    } catch (error) {
        return res.status(500).send("An Internal Server Error has occured");
    }
})



app.listen(3000,()=>{
    console.log(`Listening on localhost:${3000}`);
})

