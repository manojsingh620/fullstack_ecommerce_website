import React, { useEffect, useState } from 'react'
import ProductUpload from '../components/ProductUpload'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Products = () => {

  const [openUploadProduct,setOpenUploadProduct]=useState(false)
  const [allproduct,setAllproduct]=useState([])

  const fetchAllproduct = async()=>{

    const response = await fetch(SummaryApi.allproduct.url)
    const dataResponse = await response.json()

    console.log("Product data Response",dataResponse)

    setAllproduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllproduct()
  },[])

  return (
    <div>
      <div className='bg-white px-4 py-1 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 py-1 px-4 transition-all rounded-full border-red-600 text-red-500 hover:bg-red-600  hover:text-white' onClick={()=>setOpenUploadProduct(true)}>upload</button>
      </div>

      {/* All products */}

      <div className='flex items-cente justify-evenly flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
           {
             allproduct.map((product,index)=>{
                return(
                  <AdminProductCard data={product} key={index+"allproduct"} fetchData={fetchAllproduct}/>
                  
                )
             })
           }
      </div>

      {/*Upload Product components */}
      {
        openUploadProduct && (
        <ProductUpload onClose={()=>{setOpenUploadProduct(false)}} fetchData={fetchAllproduct}/>
      )
      }
    </div>
  )
}

export default Products