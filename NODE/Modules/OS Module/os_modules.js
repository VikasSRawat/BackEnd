const os = require("os");


//* 1. This will return the platform of the system
console.log("The platform is ",os.platform());

//* 2. This will return the user information of the system
console.log("The user Information is ",os.userInfo());

//* 3. This will return the architecture of the system
console.log("The architecture is ",os.arch());

//* 4. This will return the total memory of the system
console.log("The total memory is ",os.totalmem()," bytes");

//* 5. This will return the free memory of the system
console.log("The free memory is ",os.freemem()," bytes");

//* 6. This will return the uptime of the system
console.log("The uptime is (in seconds)",os.uptime());

//* 7. This will return the hostname of the system
console.log("The hostname is ",os.hostname());

//* 8. This will return the network interfaces of the system
console.log("The network interfaces are ",os.networkInterfaces());

//* 9. This will return the home directory of the system
console.log("The home directory is ",os.homedir()); 

//* 10. This will get the CPU Info of each logical core
console.log("The CPU Info is ",os.cpus());

//* 11. This will get the temporary directory of the system
console.log("The temporary directory is ",os.tmpdir());

//* 12. This will return the version of the system
console.log("The version is ",os.version());

//* 13. This will return the type of the system
console.log("The Operatin system is ",os.type());