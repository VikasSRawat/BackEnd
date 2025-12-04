import mysql from 'mysql2/promise';

//! 1: To Connect to mysql server

const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Heartha@123",
    //* Can leave the database blank if not created
    database:"my_sql" 
});

console.log("MySql connected successfully");

//! 2: To create a database

//? await db.execute(`create database my_sql`);

// await db.execute(`use my_sql`);
console.log(await db.execute(`show databases`));

//! 3: To create a table

//?await db.execute(`Create table users(id INT AUTO_INCREMENT PRIMARY KEY,
//?    username varchar(100) NOT NULL,
//?    email varchar(100) NOT NULL UNIQUE)`);

console.log(await db.execute(`SELECT * FROM users`))

//! 4: To perform crud operation

//TODO   Inserting into table
//? await db.execute(`INSERT INTO users values(1,"testuser1","testuser1@gmail.com")`);
//? await db.execute(`INSERT INTO users(username,email) values("testuser2","testuser2@gmail.com")`);

//* Using prepared statements(best practice) for inserting into table
//? await db.execute(`INSERT INTO users(username,email) values(?,?)`,["testuser3","testuser3@gmail.com"]);

//* For inserting multiple values using prepared statements 
const values = [
    ["tu1","tu1@gmail.com"],
    ["tu2","tu2@gmail.com"],
    ["tu3","tu3@gmail.com"],
    ["tu4","tu4@gmail.com"],
];

//? await db.query(`INSERT INTO users(username,email) values ?`,[values])

//TODO UPDATE QUERY
//? UPDATE table_name set col1 = ... & col2 = .... where condition

try {
    //? const [rows] = await db.query(`update users set username = 'testuser4' where email = 'tu1@gmail.com'`)
    //? console.log(rows)
} catch (error) {
    //? console.error(error);
}

//TODO Deleting from the database
//? DELETE FROM users WHERE condition

try {
    const [rows] = await db.query(`DELETE FROM users where email = ?`,["tu3@gmail.com"])
    console.log(rows)
} catch (error) {
    console.error(error);
}

//TODO  Reading database
const rows = await db.execute(`SELECT * FROM users`);
console.log("The data here is : ")
console.log(rows[0])

const [row] = await db.execute(`SELECT * FROM users where username = "tu2"`)
console.log(row);

