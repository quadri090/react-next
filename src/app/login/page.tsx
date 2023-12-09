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

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "verifying" : "Log In"}</h1>
      <label htmlFor="email" className='mt-4'>Email</label>
      <input
        className='text-gray-600 p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-gray-600'
        type="text" 
        id="email" 
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
      />

      <label htmlFor="password" className='mt-4'>Password</label>
      <input
        className='text-gray-600 p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-gray-600'
        type="password" 
        id="password" 
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-md my-4 focus:outline-none focus:border-gray-600'
        >LogIn
      </button>
      <Link href='/signup'>Go to signup page</Link>

    </div>
  )
}
