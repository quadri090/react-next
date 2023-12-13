"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="mt-4 p-2 bg-orange-500 text-black rounded-md">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="">
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href='/login'>
                        <p className="text-blue-500">login</p>
                    </Link>
                </div>
            )}

            {error && (
                <div className="">
                    <h2 className="text-2xl text-black bg-red-500">An error occured</h2>
                    <Link href='/login'>
                        <p className="text-blue-500">login</p>
                    </Link>
                </div>
            )}
        </div>
    )

}