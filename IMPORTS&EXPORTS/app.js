// ! The below code is for Individual imports //
// const add = require("./math.js"); // We require this to use the add function from math.js
// const div = require("./math.js"); 
// ? The above 2 requires are individual imports example and will only get one function at a time
// console.log(add(2,3));
// console.log(div(2,0));




// ! Multiple Imports by destructuring 
// const {add,sub,mult,div,PI} = require("./math.js");
// console.log(add(2,3));
// console.log(div(2,0));
// console.log(mult(5,291));
// console.log(sub(91,19));
// console.log(PI); 
// ? The output of the console.log will be undefined as the importing name should be the same as exporting name i.e., in maths.js file the export variable is named as "pi" and here it is named as "PI" which causes a mismatch 



// ! Another way of importing is by using the object import way example
const math = require("./math.js");
console.log(math.add(2,3));
console.log(math.div(2,0));
console.log(math.mult(5,291));
console.log(math.sub(91,19));
console.log(math.pi);
