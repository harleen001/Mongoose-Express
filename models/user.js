const mongoose = require("mongoose");
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

  module.exports = User;