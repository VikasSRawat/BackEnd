const add = (a,b) => {return a+b};
const sub = (a,b) => {return a-b};
const mult = (a,b) => {return a*b};
const div = (a,b) => {if(b==0) return "infinity";else return a/b;};

// ! Individual exports example
//module.exports = add; // We are exporting the add function only from this file. 
//module.exports = div; // Only this export will be counted as the bottom export will be counted as the last in individaul exports



// ! Multiple exports as individual exampls
// module.exports.add = add;
// module.exports.sub = sub;
// module.exports.mult = mult;
// module.exports.div = div;
// ? Here the functions are being exported as individual named exports where it will be destructured in app.js file


// ! Multiple exports as a group example
const pi = 3.14;
module.exports = {add,sub,mult,div,pi};
