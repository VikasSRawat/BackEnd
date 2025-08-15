import express from 'express';
import cookieParser, { signedCookie } from 'cookie-parser';

const app = express();

app.use(cookieParser("secret_key"));


app.get("/set-cookie",(req,res)=>{
    res.cookie('username','vikas',{
            maxAge : 60*1000*5,
            httpOnly:true,
            signed:true,
            secure:false,
            sameSite:'strict'
        }
    )
    
    res.send("cookie has been set");
})

app.get("/get-cookie",(req,res)=>{
    res.json("Hi "+{cookies:req.cookies,signedCookie:req.signedCookies})
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie cleared');
});

app.listen(3000, () => console.log('Server running on port 3000'));
