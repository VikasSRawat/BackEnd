import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret:'MysecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60,
        secure:false
    }
}));

app.get("/",(req,res)=>{
    req.session.userName='Vikas';
    console.log(req.session);
    res.send("Sessions data saved!\nCheck server console for sessions data");
})


app.get("/check",(req,res)=>{
    res.send(`Hello ${req.session.userName||'Guest'}`);
})


app.listen(3000,()=>{
    console.log(`Listening on http://localhost:3000`);
    
})