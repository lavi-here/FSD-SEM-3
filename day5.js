// understand the concept of fetch in console
async function test(){
    console.log("This is asynchronus function and we want to fetch data from the server");
    const response =fetch("./student.json");
    const student = await response.json();
    console.log("finally data fetched from the server");
}
test().then((result) => {
    console.log("data fetched successfully");

}).catch((error) => {
    console.log("error while fetching data from the server");
})