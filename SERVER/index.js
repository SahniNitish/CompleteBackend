const http = require("http");

const express = require("express");


const app = express();

app.get("/" , (req , res )=>{
    return res.send("Hello From The Home Page ");
});

app.get("/about" , (req , res)=>{
    return res.send("Hello From The About Page");
});

app.get("/NitishSahni" , (req , res )=>{
    return res.send("Hello My Name is Nitish Sahni")
})

app.listen(8000 , ()=> console.log("Server Started"))