import z from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, { message: "Name must be atleast 3 characters long" })
  .max(100, { message: "Name cannot be longer than 100 characters" });
export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(100, { message: "Email can be at max 100 characters long" }),
  password: z
    .string()
    .min(3, { message: "password must be atleast 3 characters long" })
    .max(100, { message: "password can be at max 100 characters long" }),
});

//? export const registerUserSchema = z.object({
//?     name: z.string().trim().min(3,{message:"Name must be atleast 3 characters long"}).max(100,{message:"Name can be at max 100 characters long"}),
//?     email : z.string().trim().email({message:"Enter a valid email address"}).max(100,{message:"Email can be at max 100 characters long"}),
//?     password : z.string().min(3,{message:"password must be atleast 3 characters long"}).max(100,{message:"password can be at max 100 characters long"}),
//? })

//* By extending the below functionality we are following the DRY principles
export const registerUserSchema = loginUserSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be atleast 3 characters long" })
    .max(100, { message: "Name can be at max 100 characters long" }),
});

export const verifyEmailSchema = z.object({
  token: z.string().trim().length(8),
  email: z.string().trim().email(),
});

export const verifyUserScehma = z.object({
  name: nameSchema,
});
