import React from 'react'

export default function UserProfile({ params }: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-2xl mt-8'>Profile Page <span className='p-2 ml-2 l bg-cyan-500 text-black rounded-lg'>{params.id}</span></p>
    </div>
  )
}