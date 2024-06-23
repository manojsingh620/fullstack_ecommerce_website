const productModel = require("../../models/productModel");

const getProductDetails =async(req,res)=>{
    try{

        const { productId }= req.body

        console.log("productId is",productId)

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            message : 'ok',
            success : "true",
            error : false
        })

    }catch(err){
        res.json({
            message: err?.message || err,
            err: true,
            success: false,
          });
    }
}

module.exports = getProductDetails