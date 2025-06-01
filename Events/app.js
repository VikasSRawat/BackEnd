//! We are not importing a module here, we are getting a class from which we need to create an instance
const EventEmitter = require('events');

//! Creating an instance of the EventEmitter class
const emitter = new EventEmitter();


//! Defining an event listener(addlistener)
//* Whenever greet event is emitted, this function will be executed
//?emitter.on('greet',()=>{ 
//?    console.log("Hello there");
//?});

//! Emitting the event
//* This will call the function that is listening to the greet event
//?emitter.emit("greet");


//! We can also pass arguments to the event listener
//? emitter.on("Greet",(name,age)=>{
//?     console.log(`Hello ${name}, You are ${age} years old`);
//? });

//* If no arguments are passed and there are no default value then it will print undefined
//?emitter.emit("Greet","Vikas Rawat",99);


//! Another way of passing multiple arguments
emitter.on("Greet",(arg)=>{
    console.log(`Hello ${arg.name}, You are ${arg.age} years old`);
});
//* The argument names should also be the same as the ones in the event listener
emitter.emit("Greet",{name:"Vikas Rawat",age:99});
