import { getUserByEmail, createUser } from "../services/auth.services.js";

export const getRegisterPage = (req,res)=>{
    console.log("getRegisterPage hit")
    return res.render("../views/auth/register",{errors:[]});
}

export const getLoginPage = (req,res)=>{
    //? console.log("getLoginPage hit")
    return res.render("../views/auth/login",{errors:[]}) //* This will also work
}

export const postLogin = (req,res)=>{
    //? res.setHeader("Set-Cookie", "isLoggedIn = true; path=/;");
    //* With Cookie-parser middleware, we can just define the key value pairs for the cookie and express automatically sets the path to / by default
    res.cookie("isLoggedIn",true);
    res.redirect("/");
};

export const postRegister = async(req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body;
    const userExists = await getUserByEmail({email});
    if(userExists) {
        console.log("User Exists");
        console.log(userExists)
        return res.redirect("/register");
    }

    const [user] = await createUser({name,email,password});

    console.log(user);
    res.redirect("/login")
}