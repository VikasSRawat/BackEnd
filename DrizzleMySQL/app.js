import { eq,and, or, sql, inArray } from "drizzle-orm";
import { db } from "./config/db.js";
import { usersTable } from "./drizzle/schema.js";

const main = async () => {
    //! Inserting users
  //? const insertUser = await db.insert(usersTable).values({
  //?     name:"vikas",
  //?     age:"24",
  //?     email:"test@gmail.com"
  //? });
  //? console.log(insertUser);

    //* For inserting multiple users, always insert it as an arrays
  //? const insertUsers = await db.insert(usersTable).values([
  //?   { name: "vikas", age: "24", email: "test1@gmail.com",},
  //?   { name: "Singh", age: "24", email: "test2@gmail.com",},
  //?   { name: "Rawat", age: "24", email: "test3@gmail.com",}
  //?   ]
  //? );
  //? console.log(insertUsers);

  //! Reading data
  //? const users = await db.select().from(usersTable).where({name : "vikas"}).where({email:"test1@gmail.com"})
  //? const users = await db.select().from(usersTable).where(or(eq(usersTable.name, "vikas"),eq(usersTable.email,"test@gmail.com")));
  //? console.log(users);

  //! Update Query
  //? const updatedUser = await db.update(usersTable).set({name:"sakiv"}).where({email:"test1@gmail.com"})
  //? const updatedUser = await db.update(usersTable).set({age:"90"}).where(eq(usersTable.name,"sakiv"))
  //? const updatedUser = await db.update(usersTable).set({age:sql`
  //?   CASE
  //?      WHEN ${usersTable.name} = 'Singh' THEN "30"
  //?      WHEN ${usersTable.name} = 'Rawat' THEN "10"
  //?      ELSE ${usersTable.age}
  //?   END
  //?   `}).where(inArray(usersTable.name,["Singh","Rawat"]))
  //? console.log(updatedUser);

  //! Deleting Users
  //? const deletedUser = await db.delete(usersTable).where(eq(usersTable.name,"sakiv"))
  //? console.log(deletedUser)
};

main();
