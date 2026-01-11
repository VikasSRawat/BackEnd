import { getUserByEmail, createUser } from "../services/auth.services.js";

export const getRegisterPage = (req,res)=>{
    // console.log("getRegisterPage hit")
    return res.render("../views/auth/register",{errors:[]});
}

export const getLoginPage = (req,res)=>{
    //? console.log("getLoginPage hit")
    return res.render("../views/auth/login",{errors:[]}) //* This will also work
}

export const postLogin = async (req,res)=>{
    const {email,password} = req.body;
    const user = await getUserByEmail({email});
    if(!user)
        return res.redirect("/login");
    if(user.password !== password){
        alert("Wrong password");
        return res.redirect("/login")
    }
    res.cookie("isLoggedIn",true);
    return res.redirect("/");
};

export const postRegister = async(req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body;
    const userExists = await getUserByEmail({email});
    if(userExists) {
        console.log("User Exists");
        console.log(userExists)
        return res.redirect("/");
    }

    const [user] = await createUser({name,email,password});

    console.log(user);
    res.redirect("/login")
}