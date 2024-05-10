const express = require("express");
const router=express.Router();
const {handleGetallUsers, handleGetuserbyId,handleInsertUser,handleUpdateUser,handleDeleteUser}= require('../controllers/user')

//ROUTES
//1..SHOW DATA OF DB
router.get("/",handleGetallUsers);


//2.. INSERTION INTO DB
router.post("/", handleInsertUser);

//3.. CUSTOM USER ID
router.get("/:id",handleGetuserbyId );

//4...UPDATIONS TO DB
router.patch("/:id",handleUpdateUser)

//5..DELETION TO DB
router.delete("/:id",handleDeleteUser)

    module.exports = router;