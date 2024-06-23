const productModel = require("../../models/productModel");


const getCategoryProduct =async(req,res)=>{

    try{

        const productCategory = await productModel.distinct("Category")
        console.log("productCategory",productCategory)

        // array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({Category : category })

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message : "category product",
            data : productByCategory,
            error : false,
            success : true,
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            err: true,
            success: false,
          });
    }
}

module.exports = getCategoryProduct