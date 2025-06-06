const fs = require("fs");
const os = require("os");


//SYNC.....
//fs.writeFileSync("./test.txt" , "Hey their , this file is created by FS Module.");
console.log(1);
//Async
fs.readFile("./test.txt" ,"utf-8" , (err,result)=>{
    console.log(result);

} );

console.log(2);
console.log(3);
console.log(4);
console.log(5);