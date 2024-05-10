const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require('ejs');

const app = express();

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use ejs as view engine
app.set(`view engine`, `ejs`);


//add static file
app.use(express.static("public"));

app.get("/",(req, res)=>{
    res.render("login");
});

app.get("/signup",(req, res)=>{
    res.render("signup");
});

//user register
app.post("/signup",async(req, res)=>{
    const data = {
        name: req.body.user_name,
        password: req.body.user_password           //fetch from html form page
    }

    //check if user already exist
    const alreadyExist = await collection.findOne({name: data.user_name});

    if(alreadyExist){
        res.send("User already exist please login");
    }
    else{
        //hash password using bcrypt
        const haspas =10 // number for bcrypt
        const hashPassword = await bcrypt.hash(data.password, haspas);

        data.password = hashPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

    
})



//login()

app.post("/login", async (req, res)=>{
    try{
        const check = await collection.findOne({name: req.body.user_name});
        if(!check){
            res.send("Username doesnot esist , Please Signup");
        }
        const isPassmatch = await bcrypt.compare(req.body.user_password, check.password);
        if (isPassmatch){
            res.render("home");
        }
        else{
            req.send("wrong password");
        }
    }

    catch{
        res.send("Wrong Details");
    }

    
});


const port = 5000;
app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
})