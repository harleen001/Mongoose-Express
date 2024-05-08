const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = 8000;

// Middleware to parse JSON request body
// app.use(express.json());

//Middleware - Plugin
app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{

    console.log("hello from middleware 1");
    //return res.json(({mgs:"Hello"}));
    next();
})


app.use((req,res,next)=>{

    console.log("hello from middleware 2");
    //return res.json(({mgs:"Hello"}));
    next();
})


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/kartik-database")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  job: { type: String },

});

// Define User Model
const User = mongoose.model('User', userSchema);

app.post('/api/Users', async(req, res) => {
    const body = req.body;
    
   //insertion into database
 const result =  await User.create({
first_name: body.first_Name, last_name: body.last_Name,email: body.Email_id, gender:body.Gender, job:body.jobTitle,
});
console.log("result = ",result);
return res.status(200).json({msg:"success"});
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`)); 