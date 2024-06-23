const orderModel = require("../../models/orderProductModel");

const orderController =async(req,res)=>{
    try{

        const currentUser = req.userId

        const orderList = await orderModel.find({ userId : currentUser}).sort({ createdAt : -1 })

        res.json({
            data : orderList,
            message : "success",
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message: err?.message || err,
            success: false,
            error: true,
          });
    }
}

module.exports = orderController