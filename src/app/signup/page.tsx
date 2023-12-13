"use client";

import Link from 'next/link';
import React from "react";
import { useRouter } from "next/navigation";
import  axios  from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  
  const [buttondisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const checkButton = async () => {
    if (!buttondisabled) {
      const onSignup = async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/users/signup", user);
          console.log("Signup successful", res.data);
          router.push("/login");
    
        } catch (error: any) {
            // toast.error(error.message);
            console.log(`Signup failed\n${error.message}`)
        } finally {
          setLoading(false);
        }
      };
      onSignup()
    }
  }


  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex items-center justify-center  min-h-screen py-2  bg-slate-900'>
      <div className='flex flex-col text-left w-full sm:w-[500px]  mx-4 sm:mx-0  p-8 text-black text-lg font-medium rounded-xl  bg-slate-300'>
        <div className='text-center'>
          <h1 className='text-[24px] font-bold'>{loading ?  "processing" : "Sign up to create account"}</h1>
          <p className='text-base mt-2'>Already have an account? <span><Link href='/login' className='text-orange-500 font-bold hover:text-gray-600 w-fit'>Login</Link></span></p>
        </div>
        <label htmlFor="username" className='mt-8'>Username</label>
        <input
          className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-14 focus:outline-none focus:border-gray-600'
          type="text" 
          id="username" 
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder="username"
        />

        <label htmlFor="email" className='mt-6'>Email</label>
        <input
          className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-14 focus:outline-none focus:border-gray-600'
          type="text" 
          id="email" 
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="email"
        />

        <label htmlFor="password" className='mt-6'>Password</label>
        <input
          className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-14 focus:outline-none focus:border-gray-600'
          type="password" 
          id="password" 
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="password"
        />

        <button
          onClick={checkButton}
          className='p-2 h-14 text-white font-bold bg-green-500 border border-gray-300 rounded-lg my-6 hover:bg-green-800'
          >{buttondisabled ? "Please provide credentials" : "Sign Up"}
        </button>
        
      </div>
      

    </div>
  )
}
