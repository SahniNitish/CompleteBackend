function logReqRes(filename){
    return  //Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use((req , res , next)=>{
    console.log("hello from the middleware 1");
    next();
})


}