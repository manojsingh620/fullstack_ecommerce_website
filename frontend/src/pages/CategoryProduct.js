import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { VscThreeBars } from "react-icons/vsc";

const CategoryProduct = () => {

    const [data,setData]=useState([])
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el=>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList]=useState([])
    
    const [shortBy,setShortBy]=useState("")


    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse.data || [])
      console.log("category product response",dataResponse)
    }

    const handleSelectCategory = (e)=>{
        const {name,value,checked} = e.target
        setSelectCategory((prevel)=>{
          return{
            ...prevel,
            [value] : checked
          }
        })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categorykeyName=>{
        if(selectCategory[categorykeyName]){
          return categorykeyName
        }
        return null
      }).filter(el =>el)
      setFilterCategoryList(arrayOfCategory)
      
      // formate for url change when change on the chekbox
      const urlFormat = arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      console.log("urlFormat",urlFormat.join(""))
      navigate("/category-product?"+urlFormat.join(""))
      // category-product?category=airpodes&&category=mouse
     },[selectCategory])

     const onchangeHandleshortBy =(e)=>{
      const {value} = e.target
      setShortBy(value)

      if(value === 'asc'){
        setData(preve=>preve.sort((a,b)=>a.SellingPrice - b.SellingPrice))
      }

      if(value === 'dsc'){
        setData(preve=>preve.sort((a,b)=>b.SellingPrice - a.SellingPrice))
      }
     }


     useEffect(()=>{

     },[shortBy])

  return (
    <div  className='container mx-auto p-4'>
        {/* desktop version */}
        <div className=' lg:grid grid-cols-[200px,1fr]'>
          {/* left side */}
          <div className='flex flex-col md:block bg-white p-2 md:min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* short by */}
             <div className='text-lg'> 
              <h3 className='text-base  uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Short by</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                
                  <div className='flex items-center gap-3'>
                    <input type='radio' name='short' checked={shortBy === 'asc'} onChange={onchangeHandleshortBy} value={"asc"}/>
                    <label>Price - Low to High</label>
                  </div>

                  <div className='flex items-center gap-3'>
                    <input type='radio' name='short' checked={shortBy === 'dsc'} onChange={onchangeHandleshortBy}  value={"dsc"}/>
                    <label>Price - High to Low</label>
                  </div>

              </form>
            </div>

           {/* filter by */}
            <div className=' text-lg'> 
              <h3 className='text-base  uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Category</h3>

              <form className='text-sm flex flex-wrap gap-2 py-2'>
                
                  {
                    productCategory.map((categoryName,index)=>{
                      return(
                        <div className='flex items-center gap-3'>
                          <input type='checkbox' name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                          <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                        </div>
                      )
                    })
                  }

              </form>
             </div>

          </div>

          {/* right side(product) */}
          <div className=''>

            <div className='flex justify-between items-center'>
              <p className='text-slate-800 font-medium text-lg my-2'>Search Result : {data.length}</p>
            </div>
    
            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 &&  (
                <VerticalCard data={data} loading={loading}/>
              )
            }
            </div>
          </div>

        </div>

    </div>
  )
}

export default CategoryProduct