const express = require("express");
const {connectMongoDB} = require("./connection")
const userRouter= require("./routes/user")
const fs =require('fs');

const {logReqRes} = require("./middlewares/index")
const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/kartik-database");

//Middleware - Plugin
app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));
app.use("/user",userRouter); //if any request comes on /user then use userrouter for that 

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`)); 