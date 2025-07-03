import mongoose, { mongo } from "mongoose";

//TODO Step 1 : Establshing the connection
try{
    //* Establishing the connection
    await mongoose.connect("mongodb://localhost:27017/mongoose_database");

    mongoose.set("debug",true); //* Enables debugging mode to log MongoDB queries in the console
}catch(error){
    console.log(error);
    process.exit();
}

//TODO Step 2. Defining the Schema of the data that is being passed
const userSchema = mongoose.Schema({
    //* Normally we just define the datatype
    //? name : String,

    //* Can define multiple parameters for email using {}
    name : {type : String,required:true},
    age : {type : Number, required : true,min : 5},
    email : {type : String, required : true, unique : true} ,
    createdAt : {type : Date, default : Date.now()},
});




//TODO Step 3 Mapping the model to the users collection (to the correct set of records)
//* 'Users' is now a model that maps to the 'users' collection in MongoDB
//* Mongoose automatically converts 'User' → 'users' (lowercase + plural)
const Users = mongoose.model("User", userSchema);



//TODO Step 4 Inserting the data into the database
await Users.create({name : "Vikas",age : 5,email : "rawatvikas01@gmail.com"});


//TODO Step 5 closing the connection
await mongoose.connection.close();
