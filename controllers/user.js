const User = require('../models/user')

async function handleGetallUsers(req,res){
const allDbUsers = await User.find({});
return res.json(allDbUsers);
}



async function handleGetuserbyId(req,res){
    const user = await User.findById(req.params.id);  
    if (!user) {
        // If user with given ID is not found, return 404
        return res.status(404).json({ error: 'User not found' });
    }
    // Return JSON data for the found user
    return res.json(user);
    }

    async function handleInsertUser(req,res){
        const body = req.body;
    
        //insertion into database
        // to check use command db.users.find()
      const result =  await User.create({
     first_name: body.first_Name, last_name: body.last_Name,email: body.Email_id, gender:body.Gender, job:body.jobTitle,
     });
     console.log("result = ",result);
     return res.status(200).json({msg:"success",id: result._id});
    
        }


 async function handleUpdateUser(req,res){
    await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"});
    return res.json({status:"Success"});
}   

async function handleDeleteUser(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
} 
    
module.exports={
    handleGetallUsers,handleGetuserbyId,handleInsertUser,handleUpdateUser,handleDeleteUser,
}