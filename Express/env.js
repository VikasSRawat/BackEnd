//* This is manual validation, where we are checking for everything manually.
//? export const PORT = isNaN(process.env.PORT)?3000:parseInt(process.env.PORT);



//* Using the zod library for validation
import {z, ZodError} from "zod";


//* First we create a schema of the validations.
const ageSchema = z.number().min(18).max(69).int(); 
//* if is number, value should not be less than 18 and not greater than 69 and it should be of int

console.log(ageSchema.parse(34)); //* The output will be 34


//? const parsedUserAge = ageSchema.parse(9);
//? console.log(parsedUserAge);//* Whereas this will give you the error.

//* Combining with try-catch block method so to give the specific error

try{
    const parsedUserAge = ageSchema.parse(91);
    console.log(parsedUserAge);
}
catch(error){
    if(error instanceof ZodError){
        console.log(error.issues[0].message);
        
    }else{
        console.log("Unexpected Error");
    } 
}

const portSchema = z.coerce.number().min(1).max(65535).default(3000);
export const PORT = portSchema.parse(process.env.PORT);

