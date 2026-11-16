import express from 'express';
const app = express();
const PORT = 3000;
app.get("/",(req,res)=>{
    return res.send("hello word");
})
app.use(express.static('public'));

app.use(express.json());

const campaigns = [
    { id: 1, name: "n1", email: "n1@abc.com" },
    { id: 2, name: "n2", email: "n2@abc.com" },
    { id: 3, name: "n3", email: "n3@abc.com" },
    { id: 4, name: "n4", email: "n4@abc.com" },
    { id: 5, name: "n5", email: "n5@abc.com" },
    { id: 6, name: "n6", email: "n6@abc.com" },
    { id: 7, name: "n7", email: "n7@abc.com" },
    { id: 8, name: "n8", email: "n8@abc.com" },
    { id: 9, name: "n9", email: "n9@abc.com" },
    { id: 10, name: "n10", email: "n10@abc.com" },
    { id: 11, name: "n11", email: "n11@abc.com" },
    { id: 12, name: "n12", email: "n12@abc.com" },
    { id: 13, name: "n13", email: "n13@abc.com" },
    { id: 14, name: "n14", email: "n14@abc.com" },
    { id: 15, name: "n15", email: "n15@abc.com" },
    { id: 16, name: "n16", email: "n16@abc.com" },
    { id: 17, name: "n17", email: "n17@abc.com" },
    { id: 18, name: "n18", email: "n18@abc.com" },
    { id: 19, name: "n19", email: "n19@abc.com" },
    { id: 20, name: "n20", email: "n20@abc.com" },
    { id: 21, name: "n21", email: "n21@abc.com" },
    { id: 22, name: "n22", email: "n22@abc.com" },
    { id: 23, name: "n23", email: "n23@abc.com" },
    { id: 24, name: "n24", email: "n24@abc.com" },
    { id: 25, name: "n25", email: "n25@abc.com" },
    { id: 26, name: "n26", email: "n26@abc.com" },
    { id: 27, name: "n27", email: "n27@abc.com" },
    { id: 28, name: "n28", email: "n28@abc.com" },
    { id: 29, name: "n29", email: "n29@abc.com" },
    { id: 30, name: "n30", email: "n30@abc.com" },
    { id: 31, name: "n31", email: "n31@abc.com" },
    { id: 32, name: "n32", email: "n32@abc.com" },
    { id: 33, name: "n33", email: "n33@abc.com" },
    { id: 34, name: "n34", email: "n34@abc.com" },
    { id: 35, name: "n35", email: "n35@abc.com" },
    { id: 36, name: "n36", email: "n36@abc.com" },
    { id: 37, name: "n37", email: "n37@abc.com" },
    { id: 38, name: "n38", email: "n38@abc.com" },
    { id: 39, name: "n39", email: "n39@abc.com" },
    { id: 40, name: "n40", email: "n40@abc.com" }
];


app.get("/campaign",(req,res)=>{
    // const {id} = req.query();
    console.log("Hello world");
    const page = parseInt(req.query.page)||1;
    const limit = 5;
    const offset = 0;
    const startIndex = offset + (page - 1) * limit;
    const endIndex = startIndex+limit;
    const data = campaigns.slice(startIndex,endIndex);
    return res.send(data);
})

app.get("/campaign/flip",(req,res)=>{
    let page = parseInt(req.query.page)||1;
    const limit = 5;
    const offset = 0;
    const startIndex = offset + (page-1)*limit;
    const endIndex = startIndex + limit;
    const data = campaigns.slice(startIndex,endIndex);

    return res.send(data);
})

app.get("/campaign/:id",(req,res)=>{
    const {id} = req.params
    for (const camp of campaigns){
        // console.log(camp);
        if(camp.id == id)
            return res.send(camp);
    }
    return res.status(404).send("Invalid Campaign ID");
})

app.post("/campaign",(req,res)=>{
    const obj = req.query
    console.log(obj);
    const newId = campaigns.length > 0 
    ? Math.max(...campaigns.map(c => c.id)) + 1 
    : 1;

  const newCampaign = {
    id: newId,
    name:obj.name,
    email:obj.email
  };
  campaigns.push(newCampaign);
  console.log(campaigns);
    return res.status(201);
})

app.listen(PORT,()=>{
    console.log(`Listening at https://localhost:${PORT}`);
});