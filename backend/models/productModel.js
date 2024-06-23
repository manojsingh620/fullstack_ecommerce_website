const mongoose = require ("mongoose")

const productSchema = mongoose.Schema({
    ProductName: String,
    BrandName: String,
    Category: String,
    ProductImage: [],
    Discription: String,
    Price: Number,
    SellingPrice: Number,
},{
    timestamps: true,
})

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;