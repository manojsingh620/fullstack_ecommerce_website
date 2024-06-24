import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRcurrency from '../helpers/displayCurrency'

const OrderPage = () => {

  const [data,setData]=useState([])

  const fetchOrderDetails =async ()=>{
    const response = await fetch(SummaryApi.orderList.url,{
      method : SummaryApi.orderList.method,
      credentials : 'include'
  })

  const responseData = await response.json()
  setData(responseData.data)

}

useEffect(()=>{
  fetchOrderDetails()
},[])

  return (
    <div>
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }

      <div className='p-4'>
        {
          data.map((item,index)=>{
              return(
                <div key={item.userId+index} className=' mb-5 border border-orange-600'>
                  <p className='text-lg font-medium ml-1'>{moment(item.createdAt).format('LL')}</p>
                  <div className='gird gap-1 ml-1'>

                    {
                       item?.productDetails.map((product,index)=>{
                        return(
                          <div key={product.productId+index} className='flex gap-3'>
                            <img src={product.image[0]}
                            className='w-28 h-28 bg-slate-200 object-scale-down p-2 mb-2 mix-blend-multiply'
                            />
                            <div>
                                <div className='text-lg font-medium text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='flex items-center gap-5 mt-1'>
                                    <div className='text-lg text-orange-600'>{displayINRcurrency(product.price)}</div>
                                    <p>Quantity : {product.quantity}</p>
                                </div>
                            </div>
                          </div>
                        )
                       })
                    }
                    
                    <div className='flex flex-col lg:flex-row gap-4 p-10'>
                      
                        <div className='mr-10'>
                          <div className=' font-medium'>Payment Details : </div>
                          <p>UserName : </p>
                          <p className=' ml-1'>Payment Method : {item.paymentDetails.payment_method_types}</p>
                          <p className=' ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                        </div>

                        <div>
                          <div className=' font-medium'>Shipping Details</div>
                          {
                            item.shipping_options.map((shipping,index)=>{
                              return(
                                <div className=' ml-1'>
                                  Shipping Amount : {shipping.shipping_amount}
                                </div>
                              )
                            })
                          }
                        </div>

                    </div>

                  </div>

                  <div  className='font-medium text-lg ml-1'>
                  Total Amount : {displayINRcurrency(item.totalAmount)}
                  </div>

                </div>
              )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage