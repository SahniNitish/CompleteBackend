const express = require("express");
const fs = require("fs");

const mongoose = require("mongoose");
const {connectMongoDb} = require("./connection");

const userRouter = require("./routes/user");


const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");


app.use("/user" , userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});