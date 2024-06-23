import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRcurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCartProduct = ({category,heading}) => {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const loadingList=new Array(13).fill(null)

    const [scroll,setScroll]=useState(0)
    const scrollElement = useRef()
    const {fetchUserAddToCart} = useContext(Context)

    const handleAddTocart=async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }

    const fetchData = async()=>{
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)

      setData(categoryProduct?.data)

      console.log("horizontal data categoryProduct",categoryProduct)
    }

    useEffect(()=>{
      fetchData()
    },[])

    const scrollRight =()=>{
      scrollElement.current.scrollLeft +=300
    }

    const scrollLeft =()=>{
      scrollElement.current.scrollLeft -=300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative' >
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-hidden transition-all' ref={scrollElement}>

        <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
        <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
              
          {
            loading ? (
              loadingList.map((product,index)=>{
                return(
                  <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                    </div>
  
                    <div className='p-4 grid w-full gap-2'>  
                      <h3 className='text-lg font-semibold text-ellipsis line-clamp-1 p-1  bg-slate-200 animate-pulse rounded-full'></h3>
                      <p className='capitalize text-slate-500 p-1 bg-slate-200'></p>
  
                      <div className='flex gap-2'>
                          <p className='text-black p-1 bg-slate-200 w-full rounded-full'></p>
                          <i className='text-slate-500 line-through p-1 bg-slate-200 w-full rounded-full'></i>
                      </div>
  
                      <button className='text-sm  text-white px-3 py-2 rounded-full mt-1 bg-slate-200'></button>
    
                    </div>
                  </div>
                )
              })
            ) : (
              data.map((product,index)=>{
                console.log("product id is ",product?._id)
                return(
                  <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                        <img src={product.ProductImage[0]} className='object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply'/>
                    </div>
  
                    <div className='p-4 grid'>  
                      <h3 className='text-lg font-semibold text-ellipsis line-clamp-1'>{product?.ProductName}</h3>
                      <p className='capitalize text-slate-500'>{product?.Category}</p>
  
                      <div className='flex gap-2'>
                          <p className='text-black '>{ displayINRcurrency(product.SellingPrice)}</p>
                          <i className='text-slate-500 line-through '>{ displayINRcurrency(product.Price)}</i>
                      </div>
  
                      <button className='text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full mt-1' onClick={(e)=>handleAddTocart(e,product?._id)}>Add to Cart</button>
    
                    </div>
                  </Link>
                )
              })
            )
            
          }
            
        </div>

    </div>
  )
}

export default HorizontalCartProduct