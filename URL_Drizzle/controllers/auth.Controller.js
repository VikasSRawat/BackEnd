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