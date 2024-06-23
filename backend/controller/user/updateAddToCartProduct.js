const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct =async(req,res)=>{
   try{
       const currentUserId = req.userId
       const addToCartProduct = req.body._id

       const qty = req.body.Quantity

       const updateProduct = await addToCartModel.updateOne({_id : addToCartProduct},{
        ...(qty && {Quantity : qty})
       })

       res.json({
        message : "Product Updated",
        data : updateProduct,
        error : false,
        seccess : true,
       })

   }catch(err){
    res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
   }
}

module.exports = updateAddToCartProduct