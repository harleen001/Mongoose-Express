const User = require('../models/user')

async function handleGetallUsers(req,res){
const allDbUsers = await User.find({});
return res.json(allDbUsers);
}

module.exports={
    handleGetallUsers,
}