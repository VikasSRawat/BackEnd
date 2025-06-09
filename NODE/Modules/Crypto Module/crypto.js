const crypto = require("crypto");

//! Generates random n(number in the brackets) bytes 
let randomValue = crypto.randomBytes(10);
console.log(randomValue);
//* Converts the bytes to a hex string
randomValue = crypto.randomBytes(10).toString("hex");
console.log(randomValue);


//! createHash is used to create a hash
//* In the parameters we have to enter which algorithm for hashing we want to use
let hashValue = crypto.createHash("sha256");
console.log(hashValue);
//* In Update we pass the value which we want to hash
hashValue = crypto.createHash("sha256").update("Hello World");
console.log(hashValue);
//* In Digest pass in what type the output should be represented
hashValue = crypto.createHash("sha256").update("Hello World").digest("hex");
console.log(hashValue);