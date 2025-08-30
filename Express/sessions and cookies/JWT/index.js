import express from 'express';
import jwt from 'jsonwebtoken';
import bodyparser from 'body-parser';


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());

const secret_Key = "secretKEY";

const users = [
  {id:1,username:"user1",password:"123"},
  {id:2,username:"user2",password:"123"},
  {id:3,username:"user3",password:"123"},
]


app.post("/login",(req,res)=>{
  const {username,password} = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if(!user){
    return res.status(401).json({message:"Invalid Credentials"});
  }

  const token = jwt.sign({id:user.id,username:user.username},secret_Key,{expiresIn:"1h"});

  return res.json({token});
});

function authenticateToken(req,res,next){
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).send("Fuck You");
  }

  jwt.verify(token,secret_Key,(err,user)=>{
    if(err){
      return res.status(403).send("Fuck you extra");
    }
    req.user = user;
    next();
  })
}


app.get("/dashboard",authenticateToken,(req,res)=>{
  return res.json({
    message:`Welcome ${req.user.username}, This is your dashboard in the index server`,
  })
})


app.listen(3000,()=>{
  console.log(`Listening at http://localhost:3000`);
});
