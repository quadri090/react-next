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

  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ?  "processing" : "Sign Up"}</h1>
      <label htmlFor="username" className='mt-4'>Username</label>
      <input
        className='text-gray-600 p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-gray-600'
        type="text" 
        id="username" 
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Username"
      />

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
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-md my-4 focus:outline-none focus:border-gray-600'
        >{buttondisabled ? "Please provide credentials" : "Sign Up"}
      </button>
      <Link href='/login'>Go to Login Page</Link>

    </div>
  )
}
