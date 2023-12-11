"use client"
import Link from 'next/link';
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  const [buttondisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false)


  const checkButtonState = async () => {
    if (!buttondisabled) { 
      const onLogin = async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/users/login", user)
          console.log("Login Successful", res.data)
          router.push("/profile")
    
        } catch (error: any) {
          console.log(error.message);
          
        } finally {
          setLoading(false)
        }
      }
      onLogin()
    }
  }


  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const resetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", user)
      console.log(user)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center  min-h-screen py-2  bg-slate-900'>
      <div  className='flex flex-col text-left w-[500px] text-lg font-medium p-8 text-black rounded-xl  bg-slate-300'>
        <div className='text-center'>
          <h1 className='text-[24px] font-bold'>{loading ?  "verifying" : "Login to your account"}</h1>
          <p className='text-base mt-2'>Don't have an account? <span><Link href='/signup' className='text-orange-500 font-bold hover:text-gray-600 w-fit'>Signup</Link></span></p>
        </div>
        <label htmlFor="email" className='mt-8'>Email</label>
        <input
          className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-12 focus:outline-none focus:border-gray-600'
          type="text" 
          id="email" 
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="email"
        />

        <label htmlFor="password" className='mt-6'>Password</label>
        <input
          className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-12 focus:outline-none focus:border-gray-600'
          type="password" 
          id="password" 
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="password"
        />

        <button
          onClick={resetPassword}
          className='text-sm w-fit hover:text-gray-600'
          >Forgot Password?
        </button>

        <button
          onClick={checkButtonState}
          className='p-2 h-12 text-white font-bold bg-green-500 border border-gray-300 rounded-lg my-6 hover:bg-green-800'
          >Login
        </button>
      </div>

    </div>
  )
}
