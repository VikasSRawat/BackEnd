const sub = (a,b) => {return a-b};
const mult = (a,b) => {return a*b};
const PI = 3.14;

//! Default exports
//* There can only be one default export in a file and it can only export one function or variable at a time 
//? export default mult; 



//! Named exports, can have multiple exports in the same module/file
//? export const div = (a,b) => {if(b==0) return "infinity";else return a/b;};
//? export const add = (a,b) => {return a+b};





//! we can also export all of them in a single object 
const addi = (a,b) => {return a+b};
const divi = (a,b) => {if(b==0) return "infinity";else return a/b;};
export {addi,sub,mult,divi,PI};