import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();

app.use(cookieParser('mysecret')); 

app.get('/set-cookie',(req,res)=>{
    res.cookie('username','vikas',{
        maxAge:1000*5*60,
        httpOnly:true,
        secure:true,
        sameSite:'Strict',
        signed:true
    })
    res.send('Cookie Set');
})


app.get("/get-cookie",(req,res)=>{
    res.json({ cookies: req.cookies, signedCookies: req.signedCookies });
})

app.get("/clear-cookie",(req,res)=>{
    res.clearCookie("username");
    res.send("Cookie Cleared");
})


app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
    
})
