const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async(req,res)=>{
    try{

        const {Category} = req?.body || req?.query
        const product = await productModel.find({Category})


        res.json({
            data : product,
            message : "Product",
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

module.exports = getCategoryWiseProduct