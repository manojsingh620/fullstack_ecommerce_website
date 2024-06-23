import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRcurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const context = useContext(Context)

    const loadingCart = new Array(context.countcartproduct).fill(null)

    const fetchData = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.cartProductView.url,{
            method : SummaryApi.cartProductView.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
        })
        setLoading(false)

        const ResponseData = await response.json()

        if(ResponseData.success){
            setData(ResponseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const increaseQnt = async(id,qty)=>{
       const response =await fetch(SummaryApi.cartProductUpdate.url,{
        method : SummaryApi.cartProductUpdate.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(
            {
                _id : id,
                Quantity : qty +1 
            }
        )
       })

       const ResponseData = await response.json()

       if(ResponseData.success){
        fetchData()
       }
    }

    const decreaseQnt = async(id,qty)=>{
        if(qty >= 2){
            const response =await fetch(SummaryApi.cartProductUpdate.url,{
                method : SummaryApi.cartProductUpdate.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        _id : id,
                        Quantity : qty - 1 
                    }
                )
               })
        
               const ResponseData = await response.json()
        
               if(ResponseData.success){
                fetchData()
               }
        }
     }

     const deleteCartProduct = async(id)=>{ 
            const response =await fetch(SummaryApi.cartProductDelete.url,{
                method : SummaryApi.cartProductDelete.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        _id : id, 
                    }
                )
               })
        
               const ResponseData = await response.json()
        
               if(ResponseData.success){
                fetchData()
                context.fetchUserAddToCart()
               }   
     }

     const handlepayment = async()=>{
        console.log("STRIPE_PUBLIC_KEY",process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                cartItems : data
            })
        })

        const ResponseData = await response.json()

        if(ResponseData?.id){
            stripePromise.redirectToCheckout({ sessionId : ResponseData.id })
        }

        console.log("responsdata of payment ",ResponseData)
     }

    const totalQty = data.reduce((prevelue,currvelue)=>prevelue + currvelue.Quantity,0)
    const totalPrice = data.reduce((preve,currve)=>preve + (currve?.Quantity * currve?.ProductId?.SellingPrice),0)

  return (
    <div className='container mx-auto'>

        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading &&  (
                    <p className='bg-white py-5'>Your Cart is Empty </p>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-evenly '>
              {/* view Product */}
            <div className='w-full max-w-3xl p-4'> 
                {
                    loading ? (
                        loadingCart.map((el,index)=>{
                            return(
                                <div key={el+"Add To Cart Loading"+index} className='bg-slate-200 w-full h-32 my-2 border border-slate-300 animate-pulse'>
                                </div>
                            )    
                        })
                       
                    ) :(
                        data.map((product,index)=>{
                            return (
                                <div key={product+"Add To Cart Loading"} className='bg-white w-full h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='h-32 w-32 bg-slate-200'>
                                        <img src={product?.ProductId?.ProductImage[0]} className='h-full w-full object-scale-down mix-blend-multiply' />
                                    </div>

                                    <div className='px-4 py-2 relative '>
                                        
                                        {/* delete cart product */}
                                        <div className='right-0 absolute text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDelete/>
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.ProductId?.ProductName}</h2>
                                        <p className='text-slate-500 capitalize'>{product?.ProductId?.Category}</p>

                                        <div className='flex items-center justify-between'>
                                            <p className='text-lg'>{displayINRcurrency(product?.ProductId?.SellingPrice)}</p>
                                            <p className='text-lg '>{displayINRcurrency(product?.ProductId?.SellingPrice * product.Quantity) }</p>
                                        </div>

                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className='p-1 text-red-600 border border-red-700 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQnt(product?._id,product?.Quantity)}>-</button>
                                            <span>{product?.Quantity}</span>
                                            <button className='p-1 text-red-600 border border-red-700 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQnt(product?._id,product?.Quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
             </div>

            {/* Total Product Summary */}

            {
                data[0] && (
                    <div className='mt-5 lg:mt-6 w-full max-w-sm rounded'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 my-2 border-slate-300 animate-pulse rounded'>
                             
                            </div>
               
                        ) : (
                            <div className='h-36 bg-white'>
                             <h2 className='text-white bg-red-600 px-4 py-1 '>Summary </h2>
                             <div className='px-4 flex justify-between gap-2 font-medium text-lg'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                             </div>
                             <div className='px-4 flex justify-between gap-2 font-medium text-lg mb-2'>
                                <p>Total Price</p>
                                <p>{displayINRcurrency(totalPrice)}</p>
                             </div>
        
                             <button className='bg-blue-600 text-white w-full p-2' onClick={handlepayment}>Payment</button>
        
                            </div>       
                        )
                    }
                    </div>
                )
            }
            

             
        </div>
          
    </div>
  )
}

export default Cart