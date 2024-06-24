const { response } = require("express");
const userModel = require("../../models/userModel");
const orderModel = require("../../models/orderProductModel");

const allOrderController = async(req,res)=>{


        const userId = req.userId

        const user = await userModel.findById(userId)

        if(user.role !== 'ADMIN'){
            return response.status(500).json({
                message : "not access"
            })
        }

        const allOrder = await orderModel.find().sort({ createdAt : -1 })

        return res.status(200).json({
            data : allOrder,
            success : true
        })

    
}

module.exports = allOrderController