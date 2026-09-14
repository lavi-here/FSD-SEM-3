let h1 = document.querySelector("h1");
h1.innerHTML = "<h2>This is not h1 </h2>";

let head = document.createElement("h1");
head.textContent="This is created by js";
document.body.appendChild(head);

//js se css badalna
let p = document.createElement("p")
p.textContent="This paragraph is created by JS";
document.body.appendChild(p);

p.style.fontSize="40px";
p.style.color="red";
p.style.textAlign="center";

p.classList.add("para");
// p.classList.toggle("para");
h1.classList.toggle("para");
head.classList.toggle("para");
console.dir(p);
console.dir(h1);
console.log(head);

//EVENT AND EVENT HANDLING

head.addEventListener("click", function() {
    head.style.color = "red";
});
head.addEventListener("dblclick", function() {
    head.style.color = "white";
});

let input = document.querySelector("#input");
input.addEventListener("input",function(val){
    console.log(val.data);
})

let option = document.querySelector("#option");

let select = document.querySelector("#select");
select.addEventListener("change",function(val){
    option.innerText = `You selected ${val.target.value}`;
})

//mouse move
let abcd = document.querySelector("#abcd");
abcd.style.height = "200px";
abcd.style.width = "200px";
abcd.style.backgroundColor = "red";
abcd.style.position = "absolute";

// document.addEventListener("mousemove", function(val) { 
//     abcd.style.left = val.clientX + "px";
//     abcd.style.top = val.clientY + "px";
// });
