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
},
{timestamps:true} //will give created at and updated at time 


);

// Define User Model
const User = mongoose.model('User', userSchema);
//ROUTES
//1..SHOW DATA OF DB
app.get("/users",async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email} </li>`).join('')}
    </ul>`;
    // Send HTML response
    res.send(html);
});


//2.. INSERTION INTO DB
app.post('/api/Users', async(req, res) => {
    const body = req.body;
    
   //insertion into database
   // to check use command db.users.find()
 const result =  await User.create({
first_name: body.first_Name, last_name: body.last_Name,email: body.Email_id, gender:body.Gender, job:body.jobTitle,
});
console.log("result = ",result);
return res.status(200).json({msg:"success"});
});

//3.. CUSTOM USER ID
app.get('/api/Users/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        // If user with given ID is not found, return 404
        return res.status(404).json({ error: 'User not found' });
    }
    // Return JSON data for the found user
    return res.json(user);
});

//4...UPDATIONS TO DB
app.patch('/api/Users/:id', async(req,res)=>{
await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"});
return res.json({status:"Success"});
})

//5..DELETION TO DB
app.delete('/api/Users/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
    })


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`)); 