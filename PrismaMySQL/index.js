import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //! 1. Inserting data into the database

  //* For adding data of a single user
  //? const user = await prisma.user.create({
  //?     data:{
  //?         name:"test1",
  //?         email:"test1@test.com"
  //?     },
  //? });
  //? console.log(user);

  //* For adding data of multiple users
  //? const users = await prisma.user.createMany({
  //?     data:[
  //?         {
  //?             name : "test2",
  //?             email : "test2@test.com"
  //?         },
  //?         {
  //?             name : "test3",
  //?             email : "test3@test.com"
  //?         },
  //?     ]
  //? })
  //? console.log(users); //* This will only tell the count of data stored in it.

  //! 2. Getting data from the table

  //* Getting data
  //? const users = await prisma.user.findMany(); //* Gets all the data
  //? console.log(users);

  //? const users = await prisma.user.findMany({
  //?     where:{name:"test2"}
  //? })
  //? console.log(users)

  //* Getting specific data
  //* findUnique will only works on those fields/attribute which are unique or else error
  //? const users = await prisma.user.findUnique({
  //?     where : {
  //?         id:2
  //?     }
  //? });
  //? console.log(users); //* If theres no data within that particular filter then it returns NULL

  //! 3. Modify Data
  //* Update One User
  //? const updatedUser = await prisma.user.update({
  //?   where: { id: 3 }, //* The attributes mentioned inside where should be unique
  //?   data: { name: "updatedtest3" },
  //? });
  //? console.log(updatedUser);

  //* Updating many users
  //? const updatedUsers = await prisma.user.updateMany({
  //?   where:{name:"updatedtest3"},
  //?   data:{name:"ManyUpdated"}
  //? })
  //? console.log(updatedUsers)

  //! 4. Deleting data
  //* Deleting one user
  //? const deletedUser = await prisma.user.delete({
  //?   where:{id:3}
  //? })
  //? console.log(deletedUser);

  //* Deleting many users
  //? const deletedmultipleusers = await prisma.user.deleteMany({
  //?   where:[{id:1},{id:4},{id:6}]
  //? })
  //? console.log(deletedmultipleusers);
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
