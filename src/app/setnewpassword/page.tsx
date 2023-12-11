"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function resetPasswordPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        token: "",
        password: ""
    });

    const resetUserPassword = async () => {
        try {
            await axios.post("/api/users/setnewpassword", user)
            console.log(`Password changed successfully\n${user}`)
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setUser({...user, token: urlToken || ""});
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Reset Password</h1>
            <label htmlFor="password" className='mt-6'>New Password</label>
            <input
            className='text-gray-600 p-2 border border-gray-300 rounded-lg my-2 h-12 focus:outline-none focus:border-gray-600'
            type="password" 
            id="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />

            <button
            onClick={resetUserPassword}
            className='p-2 h-12 text-white font-bold bg-green-500 border border-gray-300 rounded-lg my-6 hover:bg-green-800'
            >Login
            </button>
        </div>
    )

}
