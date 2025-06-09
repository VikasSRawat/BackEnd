const fs = require('fs');
const path = require('path');
const eventEmitter = require('events');
const event = new eventEmitter();


//! At first we were using seperate files for each event to store the count
//! But now we are using a single file to store all the counts with the help of JSON


// let logincount = 0;
// let logoutcount = 0;
// let purchasecount = 0;
// let ppupdatecount = 0;
const pathname = path.join(__dirname, 'Jsonfile.txt');
const getData = ()=>{
    try{
        const data = fs.readFileSync(pathname, 'utf-8');
        return JSON.parse(data);
    }catch{
        return {logins:0,logouts:0,purchases:0,ppupdates:0};
    }
}
const saveData = (data)=>{
    fs.writeFileSync(pathname, JSON.stringify(data,null,2));
}
event.on('Login',(arg)=>{
    //? logincount = parseInt(fs.readFileSync('logincount.txt','utf-8'));
    //? logincount++;
    //? fs.writeFileSync('logincount.txt',String(logincount));
    const data = getData();
    data.logins++;
    saveData(data);
    console.log(`You have logged in ${arg.un}`);
});

event.on("Logout",(arg)=>{
    //? logoutcount = parseInt(fs.readFileSync('logoutcount.txt','utf-8'));
    //? logoutcount++;
    //? fs.writeFileSync('logoutcount.txt',String(logoutcount));
    const data = getData();
    data.logouts++;
    saveData(data);
    console.log("You have logged out "+arg.un);
});

event.on("Purchase",(arg)=>{
    //? purchasecount = fs.readFileSync('purchasecount.txt','utf-8');
    //? purchasecount++;
    //? fs.writeFileSync('purchasecount.txt',String(purchasecount));
    const data = getData();
    data.purchases++;  
    saveData(data);
    console.log("You have made a purchase"+arg.item);
});

event.on("ProfileUpdate",(arg)=>{
    //? ppupdatecount = parseInt(fs.readFileSync('ppupdatecount.txt','utf-8'));
    //? ppupdatecount++;
    //? fs.writeFileSync('ppupdatecount.txt',String(ppupdatecount));
    const data = getData();
    data.ppupdates++;  
    saveData(data);
    console.log("Your profile has been updated"+arg.field);
});

event.on("Summary",()=>{
    //? logincount = fs.readFileSync('logincount.txt','utf-8');
    //? logoutcount = fs.readFileSync('logoutcount.txt','utf-8');
    //? purchasecount = fs.readFileSync('purchasecount.txt','utf-8');
    //? ppupdatecount = fs.readFileSync('ppupdatecount.txt','utf-8');
    const data = getData();
    const logincount = data.logins;
    const logoutcount = data.logouts;
    const purchasecount = data.purchases;
    const ppupdatecount = data.ppupdates;
    console.log(`You have logged in ${logincount} times`);
    console.log(`You have logged out ${logoutcount} times`);
    console.log(`You have made ${purchasecount} purchases`);
    console.log(`Your profile has been updated ${ppupdatecount} times`);
});


event.emit("Login",{un : "Vikas Rawat"});
event.emit("Purchase",{item : "Laptop"});
event.emit("ProfileUpdate",{field : "Name"});
event.emit("Logout",{un : "Vikas Rawat"});
event.emit("Summary");