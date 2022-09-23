const express=require("express"); //EXPRESS JS
const { json } = require("express/lib/response");
const jsonwebtoken=require("jsonwebtoken");
const app=express();
//ASYNC FUNCTION(PROMISE MECHANISM)
app.get("/",async(req,res)=>{
    let token=await jsonwebtoken.sign({
        date:new Date //DATE THAT SHOULD BE SYNC WITH SECRET KEY 
    },"jhsgdgfdgfgehgdgsdguwyretiehdkjhfeoiuhhdihfeih") //SECRET KEY 
    console.log(token);
    res.json({
        message:"Success",
        token
    })
})
//TOKEN VERIFICATION
app.get("/check/:token",async (req,res)=>{
    console.log(req.params.token);
    let token=req.params.token;
    //EXCEPTION HANDLING
    try{   
        let tokenresult=await jsonwebtoken.verify(token,"jhsgdgfdgfgehgdgsdguwyretiehdkjhfeoiuhhdihfeih",
        {
           expiresIn:60 //TOKEN EXPIRY TIME 60 SECONDS
        });
    console.log(tokenresult);
    if(tokenresult){ res.json({
        message:"Success",
        date:new Date(tokenresult.date).getDate() //GET THE TOKEN GENERATION DATE
    });}else{
        res.status(500).json({
            message:"Something went wrong",
        });
    }
    }
     catch (error){
        res.status(401).json({
            message:"Error"
        })
    }
 })
 //SERVER THAT TOKEN HAS BEEN GENERATED
app.listen(3000,()=>{
    console.log("Server Listening in Port 3000")
})
