import mongoose from "mongoose";


try {
    await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
} catch (error) {
    console.error(error);
    process.exit();
}


const userSchema = mongoose.Schema({
    name : {type : String,required:true},
    age : {type : Number, required : true,min : 5},
    email : {type : String, required : true, unique : true} ,
    createdAt : {type : Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()}
});

//TODO (i) Adding middleware so that it gets updated
//* By default, Mongoose does not automatically update updatedAt on updates. 
//* This middleware ensures it's always refreshed when any of the above methods are used.
userSchema.pre(
    ["updateOne","updateMany","findOneAndUpdate"], //* Hooks for these methods
    function(next){
        this.set({updatedAt : Date.now()});
        next();
    }
);

const user = mongoose.model("user",userSchema)


//? await user.create({name : "Vikas",age : 23, email : "myemail@ex.com"});


//? await user.updateOne({email : "myemail@ex.com"},{$set :{age:23}});
//* Now the data will be updated but the updateAt won't change

//* To solve this we need to define a function that will use middleware which should be defined before creating the model in (i)
await user.updateOne({email : "myemail@ex.com"},{$set:{age : 22}})//* This will have the correct updatedAt due to the middleware at (i))


await mongoose.connection.close();