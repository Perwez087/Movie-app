import React from 'react'
import loader from "/loader.gif"

const Loading = () => {
  return (
    <div className='bg-black w-screen h-screen flex items-center justify-center'>
       <img className='w-[30%] object-cover' src={loader} alt="loader" />
    </div>
  )
}

export default Loading