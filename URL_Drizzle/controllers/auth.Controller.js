import {generateToken, getUserByEmail, createUser, hashPasswod, comparePassword } from "../services/auth.services.js";

export const getRegisterPage = (req,res)=>{
    // console.log("getRegisterPage hit")
    if (req.user) return res.redirect("/");
    return res.render("../views/auth/register",{errors:[]});
}

export const getLoginPage = (req,res)=>{
    if (req.user) return res.redirect("/");

    //? console.log("getLoginPage hit")
    return res.render("../views/auth/login",{errors:[]}) //* This will also work
}

export const postLogin = async (req,res)=>{
    const {email,password} = req.body;
    // console.log(email);
    // console.log(password);
    const user = await getUserByEmail({email});
    if(!user){
        console.log("User does not exist");
        return res.redirect("/login");
    }

    const isPasswordValid = await comparePassword(password,user.password);
    if(!isPasswordValid){
        console.log("Wrong password");
        return res.redirect("/login")
    }

    console.log("Correct password");
    const token = generateToken({
        id: user.id,
        name : user.name,
        email : user.email
    });

    console.log("token in auth.controller",typeof(token));
    res.cookie("access_token",token,{path:"/"});
    return res.redirect("/");
};

export const postRegister = async(req,res)=>{
    if (req.user) return res.redirect("/");

    // console.log(req.body);
    const {name,email,password} = req.body;
    const userExists = await getUserByEmail({email});
    if(userExists) {
        console.log("User Exists");
        console.log(userExists)
        return res.redirect("/");
    }
    const hashedPassword = await hashPasswod(password);
    const [user] = await createUser({name,email,password:hashedPassword});

    console.log(user);
    res.redirect("/login")
}