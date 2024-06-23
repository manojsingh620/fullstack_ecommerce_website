const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function uploadProcuctController(req,res) {
    try{

        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error ("Permission Denied")
        }

        const uploadProduct = await productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product Uploaded successfully",
            error : false,
            success:true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false,
          });
    }
    
}

module.exports = uploadProcuctController