
const express = require("express");

const router  = express.Router();

//Routes
router.get("/", (req, res) => {
      res.setHeader("X-MyName" , "Nitish Sahni ");
    return res.json(users);
})


//REST API 
// app.get("/api/users" , (req , res )=>{
//     res.setHeader("X-MyName" , "Nitish Sahni ");
/
router.route("/:id").get((req, res) => {
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




router.post("/" , async (req , res )=>{
    //TODO : Create New user
    const body = req.body;
    
    if(
       !body||
       !body.first_name ||
       !body.last_name ||
       !body.email||
       !body.gender||
       !body.job_title        

    ){
        return res.status(400).json({msg:"All field are req..."});
    }
    
    const result = await User.create({
        firstName:body.first_name,
        lastName :body.last_name,
        email    :body.email,
        gender   :body.gender,
        jobTitle :body.job_title,

    });

    return res.status(201).json({msg:"success"});

});


module.exports = router;