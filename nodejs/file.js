const fs = require("fs");


//SYNC.....
//fs.writeFileSync("./test.txt" , "Hey their , this file is created by FS Module.");

//Async
const result = fs.writeFile("./test.txt" ,"hello world Async" , (err)=>{} );
console.log(result);
