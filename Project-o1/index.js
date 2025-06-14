const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Routes
app.get("/api/users", (req, res) => {
    return res.json(users);
})


app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
   return res.json(user);




}).patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);

    for(const key in req.body){
        id(user.hasOwnProperty(key))
        {
            user[key] = req.body[key];
        }
    }
   return res.json({ message: 'user Updated' , user });
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