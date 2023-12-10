"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing")

  const logout = async () => {
    try {
      axios.get("api/users/logout");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    //we can actually use the useEffect hook to display the data from the token on page load instead of having to click the get user details button below
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className=' bg-blue-500 mt-4  text-white py-2 px-4 rounded-lg'>{data === "nothing" ? " No Data to Display" : <Link 
        href={`profile/${data}`}>{data}</Link>}</h2> 
        <hr />
        <button
        onClick={logout}
        className='bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg'
        >Logout</button>

        <button
        onClick={getUserDetails}
        className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'
        >Get User Details</button>
    </div>
  )
}
