const productModel = require("../../models/productModel")

const searchProduct =async(req,res)=>{
    try{
        const query = req.query.q

        console.log("search query ",query)

        const regex = new RegExp(query,'i','g')

        const product = await productModel.find({
            "$or" : [
                {
                    ProductName : regex
                },
                {
                    Category : regex
                },
            ]
        })

        res.json({
            data : product,
            message : "Search Product list",
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}
module.exports = searchProduct