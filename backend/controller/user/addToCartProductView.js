const addToCartModel = require("../../models/cartProduct");

const addToCartProductView = async(req,res)=>{
  try{

    const currentUser = req.userId
    const allProduct = await addToCartModel.find({
        UserId : currentUser
    }).populate("ProductId")

    res.json({
        data : allProduct,
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

module.exports= addToCartProductView