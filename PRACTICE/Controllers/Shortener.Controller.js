export const postURLShorterner = async(req,res)=>{
    console.log(req.body);
    return res.redirect("/");
    
}

export const redirectToShortlink = async(req,res)=>{
    console.log(hi);
}


export const getShortenerpage = async(req,res)=>{
    return res.render("index");
}