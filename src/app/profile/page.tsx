"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: ""
  })

  const logout = async () => {
    try {
      axios.get("api/users/logout");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      
    }
  }

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me")
  //   console.log(res.data);
  //   setData(res.data.data)
  // }

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me")
      console.log(res.data);
      setData(res.data.data)
    }
    getUserDetails()
  }, [])

  return (
    //we can actually use the useEffect hook to display the data from the token on page load instead of having to click the get user details button below
    <div className='flex flex-col items-center justify-center  min-h-screen py-2  bg-slate-900'>

      <div  className='flex flex-col text-left w-[500px] text-lg font-medium py-8 text-white rounded-xl'>
        <div className='flex gap-6'>
          <div className='w-8 h-8 text-[20px] font-bold text-center text-zinc-700 rounded-lg bg-slate-300'>&lt;</div>
          <h1 className='text-[28px] font-bold mb-12'>My Account</h1>
        </div>
        <div className='flex gap-4 w-fit '>
          <div className='w-16 h-16 flex items-center justify-center text-sm text-zinc-700 rounded-full bg-orange-500'>Image</div>
          <div className=''>
            <p>{data.username}</p>
            <p className='text-xs text-center w-fit px-2 mt-2 outline outline-1 outline-orange-500 rounded-2xl'>free</p>
          </div>
        </div>
      </div>
      
      <div  className='flex flex-col gap-4 text-left w-[500px] text-lg font-medium p-8 text-zinc-700 rounded-xl  bg-slate-300'>
        <div>
          <p className='text-sm '>Display Name</p>
          <h2 className='text-black font-bold'>{data.username}</h2> 
        </div>
        <div className='w-full border-b-2 border-orange-500'></div>
        <div>
          <p className='text-sm '>Email</p>
          <h2 className='text-black font-bold'>{data.email}</h2> 
        </div>
        <div className='w-full border-b-2 border-orange-500'></div>
        <div>
          <p className='text-sm '>Phone</p>
          <h2 className='text-black font-bold'>07010816900</h2> 
        </div>
        <div className='w-full border-b-2 border-orange-500'></div>
        <div>
          <p className='text-sm '>Password</p>
          <h2 className='text-black font-bold'>*********</h2> 
        </div>
      </div>
      <button
      onClick={logout}
      className='bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg'
      >Logout</button>
    </div>
  )
}
