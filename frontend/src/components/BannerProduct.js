import React, { useEffect, useState } from 'react'
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"

import image1Mobile from "../assest/banner/img1_mobile.jpg"
import image2Mobile from "../assest/banner/img2_mobile.webp"
import image3Mobile from "../assest/banner/img3_mobile.jpg"
import image4Mobile from "../assest/banner/img4_mobile.jpg"
import image5Mobile from "../assest/banner/img5_mobile.png"

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {

const [currentImg,setCurrentImg]=useState(0)

    const desktopImage =[
        image1,
        image2,
        image3,
        image4,
        image5,
    ]
    const mobileImage =[
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ]

    const nextImage=()=>{
      if(desktopImage.length -1 > currentImg){
        setCurrentImg(prve=>prve + 1)
      }
        
    }

    const preveImage=()=>{
      if(currentImg != 0){
        setCurrentImg(prve=>prve - 1)
      }
        
    }

    useEffect(()=>{
      const interval = setInterval(()=>{
        if(desktopImage.length -1 > currentImg){
          nextImage()
        }else{
          setCurrentImg(0)
        }
      },2000)
      return ()=>clearInterval(interval)
    })
    

  return (
    <div className='container mx-auto px-4  '>
        <div className='h-56 md:h-72 w-full bg-slate-200 rounded relative'>
            
           <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-3xl'>
                    <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                </div>
           </div>

            {/* Desktop and tablet version */}

           <div  className='hidden  md:flex h-full w-full overflow-hidden'>
            {
               desktopImage.map((imgURL,index)=>{
                return(
                <div className='h-full w-full min-w-full min-h-full transition-all' key={imgURL} style={{transform : `translateX(-${currentImg * 100}%)`}}>
                   <img src={imgURL} className='h-full w-full'/> 
                </div>
               )})
            }
          </div>
            
            {/* Mobile version */}

           <div  className='flex h-full w-full overflow-hidden md:hidden'>
            {
               mobileImage.map((imgURL,index)=>{
                return(
                <div className='h-full w-full min-w-full min-h-full transition-all' key={imgURL} style={{transform : `translateX(-${currentImg * 100}%)`}}>
                   <img src={imgURL} className='h-full w-full'/> 
                </div>
               )})
            }
          </div>
            
        </div>
    </div>
  )
}

export default BannerProduct