const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

//connection
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=> console.log("mongoDB connected"))
.catch((err)=> console.log("MogoBD error " , err));



//Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type:String ,
        required: true,
    },
    gender:{
        type:String,
        required:true,

    }
})

const User = mongoose.model('user' , userSchema);


//Middleware
app.use(express.urlencoded({ extended: false}));

app.use((req , res , next)=>{
    console.log("hello from the middleware 1");
    next();
})
//Routes
app.get("/api/users", (req, res) => {
      res.setHeader("X-MyName" , "Nitish Sahni ");
    return res.json(users);
})


//REST API 
// app.get("/api/users" , (req , res )=>{
//     res.setHeader("X-MyName" , "Nitish Sahni ");
//     //always use X to custom headers 
//     return res.json(users);
// })

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
   return res.json(user);

}).patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    for (const key in req.body) {
        if (user.hasOwnProperty(key)) {  // Fixed: changed id() to if()
            user[key] = req.body[key];
        }
    }

    // Save changes to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({ message: 'User Updated', user });
    });
})



.delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex , 1 );
   return res.json({message: 'User DELETED'});
    
  
})




app.post("/api/users" , (req , res )=>{
    //TODO : Create New user
    const body = req.body;
    users.push({...body , id : users.length +1});
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err , data)=>{
        if (err) {
            return res.status(500).json({ status: "error", error: err });
        }
        return res.json({ status: "success", id: users.length });
    });
});


app.listen(PORT, () => {
    console.log(`Server Started`)
})