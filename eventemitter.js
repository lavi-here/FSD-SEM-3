// // //eventWmitter is class
// // //emit("event param"):trigger/create/fire and on("event param"):listen/subscribe    
// // const EventEmitter = require('events');
// // const event = new EventEmitter();
// // event.on("greet", (name) => {
// //     console.log(`This is event emitter`);
// // });
// // event.emit("greet");

// // //

// class Button extends EventEmitter 
// {
//     click(){
//         consike.log("/n call button click event");
//         this.emit("click");
//     }
//     mouseover(){
//         console.log("/n call button mouseover event");
//         this.emit("mouseover");
//     }
// }
// const EventEmitter = require('events');

console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

console.log("End");