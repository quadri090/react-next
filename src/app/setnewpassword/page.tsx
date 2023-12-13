"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        token: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [axiosError, setAxiosError] = useState(false)

    const checkPasswordLength = async () => {
        if(user.password.length >= 8) {
            const resetUserPassword = async () => {
                try {
                    await axios.post("/api/users/setnewpassword", user)
                    console.log(`Password changed successfully\n${user}`)
                    router.push("/login")
                } catch (error: any) {
                    setAxiosError(true)
                    console.log(error.message)
                }
            }
            resetUserPassword()
        } else {
            setError(true)
        }
    }

    
    useEffect(() => {
        if (user.password.length >= 8) {
            setError(false);
        }
    }, [error])


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setUser({...user, token: urlToken || ""});
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen py-2 bg-slate-900">
            <div className='flex flex-col text-left w-[500px] text-lg font-medium p-8 text-black rounded-xl  bg-slate-300'>
                <h1 className='text-[18px] font-semibold'>Enter new password</h1>
                <input
                className='text-gray-600 p-2 border border-gray-300 rounded-lg mt-6 mb-2 h-12 focus:outline-none focus:border-gray-600'
                type="password" 
                id="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />
                {error && (
                    <p className="text-sm font-medium text-red-600">Password must be 8 characters or more</p>
                )}

                <button
                onClick={checkPasswordLength}
                className='p-2 h-12 text-white font-bold bg-green-500 border border-gray-300 rounded-lg mt-6 mb-4 hover:bg-green-800'
                >Reset Password
                </button>
                {axiosError && (
                    <div className='flex items-center gap-2 font-bold text-red-500'>
                        <p className='text-sm'>Link Expired</p>
                        <FaExclamationCircle />
                        <Link href='/login' className="text-green-500 font-semibold">Go to Login</Link>
                    </div>
                )}
            </div>
        </div>
    )

}
