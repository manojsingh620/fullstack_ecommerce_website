const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error ("Permission Denied")
        }
        const {_id,...resbody}  = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resbody)

        res.json({
            message : " Product update successfully",
            data : updateProduct,
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

module.exports = updateProductController