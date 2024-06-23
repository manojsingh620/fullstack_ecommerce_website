const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productDetails : {
        type : Array,
        default : []
    },
    email : {
        type : String,
        default : ''
    },
    userId : {
        type : String,
        default : ''
    },
    paymentDetails : {
        paymentId : {
            type : String,
            default : ''
        },
        payment_method_types : [],
        payment_status : String,
    },
    shipping_options : [],
    totalAmount : {
        type : Number,
        default : ''
    }
},{
    timestamps : true
})

const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel