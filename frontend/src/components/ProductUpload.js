import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from "react-toastify"

const ProductUpload = ({ onClose ,fetchData}) => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Discription: "",
    Price: "",
    SellingPrice: "",
  });

 const [openFullScreenImg,setOpenFullScreenImg]=useState(false)
 const [fullScreenImg,setFullScreenImg] = useState("")

  const handleOnChange = (e) => {
    const {name,value}=e.target 
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  };

  const handelUploadProduct=async(e)=>{
    const file = e.target.files[0]
    // setUploadImageInp(file.name)
    // console.log("file",file);
    const imageUploadCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        ProductImage : [...preve.ProductImage,imageUploadCloudinary.url]
      }
    })

  }

  const handelDeleteProductImg = async (index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.ProductImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        ProductImage : [...newProductImage]
      }
    })
    
  } 

  // Upload Product

  const handelSubmit=async(e)=>{
     e.preventDefault()
    
     const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
     })

     const responseData =await response.json()

     if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
     }

     if(responseData.error){
      toast.error(responseData?.message)
     }


  }

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-20  left-0 right-0 bottom-0 flex justify-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg"> Upload Products</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form className="grid p-4 gap-1 overflow-y-scroll h-full pb-5" onSubmit={handelSubmit}>
          <label htmlFor="ProductName">Product Name :</label>
          <input
            type="text"
            id="ProductName"
            placeholder="enter product name"
            value={data.ProductName}
            name="ProductName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="BrandName">Brand Name :</label>
          <input
            type="text"
            id="BrandName"
            placeholder="enter product BrandName"
            value={data.BrandName}
            name="BrandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Category" className="mt-3">
            Category Type :
          </label>
          <select
            required
            value={data.Category} name="Category"
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange} 
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="ProductImage" className="mt-3">
            Product Image :
          </label>

          <label htmlFor="ProductImageUpload">
            <div className="bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">

              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-3xl">
                  <MdCloudUpload />
                </span>
                <p className="text-1.5xl">upload product image</p>
                <input type="file" id="ProductImageUpload" name="ProductImageUpload"  className="hidden" onChange={handelUploadProduct} required />
              </div>

            </div>
          </label>
          <div>

              {
                data?.ProductImage[0] ? (
                  <div className="flex items-center gap-2">
                    {
                      data.ProductImage.map((el,index)=>{
                        return(
                          <div className="relative group">
                            
                              <img
                              src={el} alt={el}
                              width={80}
                              height={80}
                              className="bg-slate-100 border cursor-pointer "
                              onClick={()=>{
                              setOpenFullScreenImg(true)
                              setFullScreenImg(el)
                              }}
                              />

                              <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer" onClick={()=>handelDeleteProductImg(index)}>
                              <MdDelete />
                              </div>
                           </div>
                        )
                      })
                    }
                  </div>
                ):(
                 <p className="text-red-500 text-xs">*please upload product image</p>
                )
              }

            
          </div>
      
          <label htmlFor="Price">Price :</label>
          <input
            type="number"
            id="Price"
            placeholder="enter product price"
            value={data.Price}
            name="Price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="SellingPrice">Selling Price :</label>
          <input
            type="number"
            id="SellingPrice"
            placeholder="enter product selling price"
            value={data.SellingPrice}
            name="SellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Discription">Discription :</label>
          <textarea className="h-28 bg-slate-100 border resize-none p-1" 
          name="Discription"
          value={data.Discription}
          rows={3} 
          onChange={handleOnChange}
          placeholder="enter product discription"
          required
          >

          </textarea>


          <button className="p-2 bg-red-600 text-white rounded mb-5 hover:bg-red-700">Upload Product</button>

        </form>
      </div>

      {/* Display image  full screen */}

      {
        openFullScreenImg && (
        <DisplayImage onClose={()=>setOpenFullScreenImg(false)} imgUrl={fullScreenImg}/>
      )
      }
      

    </div>
  );
};

export default ProductUpload;
