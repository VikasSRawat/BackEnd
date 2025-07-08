import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
} catch (error) {
    console.error(error);
    process.exit();
}


// const userSchema = {
//     name : {type : String,required : true},
//     age : {type : Number,required : true,min :5},
//     email : {type : String,required:true,unique : true},
//     
// };

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 5 },
    email: { type: String, required: true, unique: true }
  },
  {
    timestamps: true // ✅ Automatically adds createdAt and updatedAt fields
  }
)


const user = mongoose.model("user",userSchema);

//? await user.create({name : "Sakiv",age : 200,email : "ex1@google.com"});


await user.updateOne({email : "ex1@google.com"},{$set:{age : 55}})

await mongoose.connection.close();