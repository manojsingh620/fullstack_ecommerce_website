const mongoose = require ("mongoose")

const addToCart = mongoose.Schema({
    ProductId : {
        ref : 'product',
        type : String,
    },
    Quantity : Number,
    UserId : String
},{
    timestamps: true
})

const addToCartModel = mongoose.model("addToCart", addToCart);
module.exports = addToCartModel;