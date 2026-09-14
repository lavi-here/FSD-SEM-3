// function add(a,b) {
//     return a+b;
// }

// console.log(add(10,5));

// const subtract = (a,b) => {
//     return a-b;
// }

// console.log(subtract(10,5));

// function addNum(){
//     console.log(arguments);
// }

// addNum(1,2,3,4,5,6,7,8,9,10);

// function hello(){
//     console.log("Hello,World");
// }
// hello();
// console.log("this is synchronus programming");

// const hello = () => {
//     setTimeout (() => {
//         console.log("Hello,World");
//     },2000);
// }
// hello();
// console.log("This is asynchronus programming");

function add(n1,n2,callback){
    console.log(n1+n2);
    if(callback){
        callback();
    }
}
let a= 10;
let b= 20;
add(a,b,sayHi);
add(a,b,hello);
function sayHi(){
    console.log("this is callback function");
}
function hello(){
    console.log("Hello,World");
}

//create a function
function display(callback){
    console.log("Welcome to ABES");
    callback();
}
function learning(){
    console.log("learning FSD in CSE 21");
}
display(learning);

