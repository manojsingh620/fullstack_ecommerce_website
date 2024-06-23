const userModel = require("../../models/userModel");



async function updateUser(req,res){

    try{
       const sessionId = req.userId;

       const {userId,email,name,role}=req.body

       const payload = {
           ...(email && {email : email}),
           ...(name && {name : name}),
           ...(role && {role : role})
       }

       const user = await userModel.findById(sessionId);
       console.log("user role",user.role);

       const updateUser = await userModel.findByIdAndUpdate(userId,payload)

       res.json({
        data : updateUser,
        message : "User updated",
        error : false,
        success : true
       })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false,
          });
    }
}

module.exports = updateUser