const userModel = require("../../models/userModel");


async function allUsers(req,res){
    try{
       console.log("user detail from allUsers",req.userId);

       const allusers = await userModel.find()
        res.json({
            message : "All users data ",
            data : allusers,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false,
          });
    }
}

module.exports = allUsers