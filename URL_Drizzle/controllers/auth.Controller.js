import { getUserByEmail, createUser, hashPasswod, comparePassword } from "../services/auth.services.js";

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
    if(!user){
        console.log("User does not exist");
        return res.redirect("/login");
    }

    const isPasswordValid = await comparePassword(password,user.password);
    if(!isPasswordValid){
        console.log("Wrong password");
        return res.redirect("/login")
    }
    res.cookie("isLoggedIn",true);
    console.log("Logged In");
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
    const hashedPassword = await hashPasswod(password);
    const [user] = await createUser({name,email,password:hashedPassword});

    console.log(user);
    res.redirect("/login")
}