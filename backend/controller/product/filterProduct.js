const productModel = require("../../models/productModel");

const filterCategoryController =async(req,res)=>{
      try{
          const categoryList = req?.body?.category || []
          
          const product = await productModel.find({
            Category : {
                "$in" : categoryList
            }
          })

          res.json({
            message : "product",
            data : product,
            success : true,
            error : false,
          })

      }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
      }
}

module.exports = filterCategoryController