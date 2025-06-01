//! Example of default import 
//? import mult from './math.js';
//? console.log(mult(12,3));

//! Example of named import
//* You always have to give the curly braces when importing named exports
//* You can import multiple named exports from a file
//? import {div} from './math.js';
//? console.log(div(12,3));
//? import {add} from './math.js';
//? console.log(add(49,92));

//* We can also destructure the imports directly
//? import {div,add} from './math.js';
//? console.log(div(12,3));
//? console.log(add(49,92));


//! Destructuring the import all at once
import {addi,sub,mult,divi} from './math.js';
console.log(addi(12,3));
console.log(sub(12,3));
console.log(mult(12,3));
console.log(divi(12,3));    