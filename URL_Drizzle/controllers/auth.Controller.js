export const getRegisterPage = (req,res)=>{
    console.log("getRegisterPage hit")
    return res.render("../views/auth/register");
}

export const getLoginPage = (req,res)=>{
    console.log("getLoginPage hit")
    return res.render("../views/auth/login") //* This will also work
}