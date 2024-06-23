const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async(req,res)=>{
    try{
        const {cartItems} = req.body

        const user = await userModel.findOne({ _id : req.userId})

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1PTxyfRtDf3VyCPRkChJhzYy'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : req.userId
            },
            line_items : cartItems.map((items,index)=>{
                return{
                    price_data :{
                       currency : 'inr',
                       product_data : {
                          name : items.ProductId.ProductName,
                          images : items.ProductId.ProductImage,
                          metadata : {
                            ProductId : items.ProductId._id
                          }
                       },
                       unit_amount : items.ProductId.SellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : items.Quantity
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancle`,
        }

        const session = await stripe.checkout.sessions.create(params)

        res.status(303).json(session)

    }catch(err){
        res.json({
            message: err?.message || err,
            success: false,
            error: true,
          });
    }
}

module.exports = paymentController