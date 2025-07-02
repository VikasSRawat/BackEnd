//! Creating and connecting to a mongodb instance also adding the data
import { MongoClient } from "mongodb";

//TODO Since we are using the localhost to connect to hence the data will be stored at compass in our localmachine
//* Step 1: Create a new client instance for connecting to MongoDB
//* The URL "mongodb://localhost:27017" refers to the local MongoDB server running on default port 27017
const client = new MongoClient("mongodb://localhost:27017");
//* Step 2: Establish the connection to the MongoDB server
await client.connect(); //* This opens a connection between your Node.js app and the MongoDB server


//* Step 3: Select or create a database named "mongodb_nodejs_db"
const db = client.db("mongodb_nodejs_db");

//* Step 4: Access (or create if it doesn't exist) a collection named "users" inside the database
const userCollection = db.collection("users");

//* Step 5: Insert a new document into the "users" collection
//* This document can have any number of fields it does not need to be homogenous
//? await userCollection.insertOne({name : 'test_user_3',age : 24, height:174});

//* Adding multiple values at the same time
//? await userCollection.insertMany([
//?     {Name : "test_many_1",age : 1},
//?     {Name : "test_many_3",age : 3},
//?     {Name : "test_many_2",age : 2}
//? ])


//! Reading Data from the database

//* The find() function without any parameters returns a cursor object that points to all documents in the collection.
//* It does not immediately fetch the data — it sets up a pipeline to fetch results on demand (lazy evaluation).
//? const userCursor = userCollection.find();
//? console.log(userCursor);
//* Here we are iterating the cursor to get each data
//? for await(const user of userCursor){
//?     console.log(user);
//? }

//* This will convert the data into an array
//? const userCursor = await userCollection.find().toArray();
//? console.log(userCursor);


//* The below one will give output as null as the database contains Vikas Rawat not Vikas
//?  const user = await userCollection.findOne({name : "Vikas"});


const user = await userCollection.findOne({name : "Vikas Rawat"});
console.log(user);
//* The below 2 will give the same output
console.log(user.age);
console.log(user["age"]);


//! Updating the document

//* If there are multiple docs with the same parameter as mentioned then only topmost one will be updated
//? await userCollection.updateOne({name : "Vikas Rawat"},{$set:{role : "admin"}});

//? await userCollection.updateMany({age : 24},{$set:{age : 23}});


//! Deleting the document
//* Before trying out the below functions, make sure that the docs should already be presented before being deleted
//? await userCollection.deleteOne({role : "tester"});

const res = await userCollection.deleteMany({role:"tester"});
console.log(`${res.deletedCount} docs deleted`);






