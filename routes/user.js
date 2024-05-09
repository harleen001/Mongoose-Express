const express = require("express");

const router=express.Router();

//ROUTES
//1..SHOW DATA OF DB
router.get("/",async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email} </li>`).join('')}
    </ul>`;
    // Send HTML response
    res.send(html);
});


//2.. INSERTION INTO DB
router.post('/', async(req, res) => {
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
router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        // If user with given ID is not found, return 404
        return res.status(404).json({ error: 'User not found' });
    }
    // Return JSON data for the found user
    return res.json(user);
});

//4...UPDATIONS TO DB
router.patch('/:id', async(req,res)=>{
await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"});
return res.json({status:"Success"});
})

//5..DELETION TO DB
router.delete('/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
    })

    module.exports = router;