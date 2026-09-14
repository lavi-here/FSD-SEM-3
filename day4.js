// create one promises that will display user name and password
//using resolve and if data will be empty then it will reject the promise
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//     let err = true;
//     if (!err) {
//         resolve("user name and password is displayed");
//     } else {
//         reject("data is empty");
//     }
// }
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// }

//async /await
async function test(){
    console.log("1st line of test function");
    console.log("2nd line of test function");
    await console.log("3rd line of test function");
    console.log("4th line of test function");
}
test();
console.log("1st line of main function");