import {generateToken, getUserByEmail, createUser, hashPasswod, comparePassword } from "../services/auth.services.js";
import { loginUserSchema, registerUserSchema } from "../validators/auth-validator.js";

export const getRegisterPage = (req,res)=>{
    // console.log("getRegisterPage hit")
    if (req.user) return res.redirect("/");
    return res.render("../views/auth/register",{errors:req.flash("errors")});
}

export const getLoginPage = (req,res)=>{
    if (req.user) return res.redirect("/");

    //? console.log("getLoginPage hit")
    return res.render("../views/auth/login",{errors:req.flash("errors")}) //* This will also work
}

export const postLogin = async (req,res)=>{
    //? if(req.user) return res.redirect("/");
    const{data,error} = loginUserSchema.safeParse(req.body);
    if(error){
        const error_message = error.issues[0].message;
        req.flash("errors",error_message);
        return res.redirect("/login");
    }
    const {email,password} = data;
    const user = await getUserByEmail({email});
    if(!user){
        //? console.log("User does not exist");
        req.flash("errors","Invalid Email or Password");
        return res.redirect("/login");
    }

    const isPasswordValid = await comparePassword(password,user.password);
    if(!isPasswordValid){
        //? console.log("Wrong password");
        req.flash("errors","Invalid Email or Password");
        return res.redirect("/login")
    }

    console.log("Correct password");
    const token = generateToken({
        id: user.id,
        name : user.name,
        email : user.email
    });

    //? console.log("token in auth.controller",typeof(token));
    res.cookie("access_token",token,{path:"/"});
    return res.redirect("/");
};

export const postRegister = async(req,res)=>{
    if (req.user) return res.redirect("/");

    //? console.log(req.body);
    //? const {name,email,password} = req.body;
    const {data,error} = registerUserSchema.safeParse(req.body);
    if(error){
        //? console.log(error);
        const error_message = error.issues[0].message;
        req.flash("errors",error_message);
        return res.redirect("/register");
    }
    console.log(data);

    const {name,email,password} = data;
    const userExists = await getUserByEmail({email});
    console.log(userExists);
    if(userExists) {
        //? console.log("User Exists");
        //? console.log(userExists)
        //? return res.redirect("/");
        req.flash("errors","User Already Exists");
        return res.redirect("/register");
    }
    const hashedPassword = await hashPasswod(password);
    const [user] = await createUser({name,email,password:hashedPassword});

    //?console.log(user);
    req.flash("success","User Created Successfully");
    res.redirect("/login")
}



export const getMe = (req,res) =>{
    if(!req.user) return res.send("Not Logged In");
    return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`)
}


export const logoutUser = (req,res)=>{
    res.clearCookie("access_token");
    res.redirect("/login");
}