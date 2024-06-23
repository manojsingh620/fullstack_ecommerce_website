import React, { useState } from 'react'
import ROLE from "../common/role"
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRoll = ({
  name,
  email,
  role,
  userId, 
  onclose,
  callFunc,
}) => {

  const [userRole,setUserRole]=useState(role)
  const handleRollChange =(e)=>{
    setUserRole(e.target.value)
    console.log("User Role = ",userRole)
  }

  const updateUserRoll= async()=>{

    const fetchRsponse = await fetch(SummaryApi.update_users.url,{
      method : SummaryApi.update_users.method,
      credentials : "include",
      headers :{
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        userId : userId,
        role : userRole
      })
    })

    const responseData = await fetchRsponse.json();

    console.log("responseData from changeUserUpdate",responseData);

    if(responseData.success){
      toast.success(responseData.message)
      onclose()
      callFunc()
    }

  }
  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10  flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div className=' mx-auto p-4 bg-white shadow-md w-full max-w-sm' >
          <button className='block ml-auto' onClick={onclose}>
          <IoClose />
          </button>
          <h1 className='pb-4 text-lg font-medium'>Change User Roll</h1>
          <p>Name : {name}</p>
          <p>Emial : {email}</p>

          <div className='flex items-center justify-between my-2'>
          <p>Role :</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleRollChange}>
            {
              Object.values(ROLE).map(el =>{
                return(
                  <option values={el} key={el}> {el}</option>)
              })
            }
            </select>
          </div>
            
            <button className='w-fit m-auto block  py-1 px-3 rounded-full bg-blue-600 text-white hover:bg-blue-700' onClick={updateUserRoll}>Change Roll</button>
          
      </div>
       
    </div>
  )
}

export default ChangeUserRoll