import React from 'react'

const Newsletter = () => {
  return (
    <div className='px-4 w-full py-16 text-white'>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
            <div>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Want tips & tricks to optimize your workflow? </h1>
                <p>Sign up to our newsletter and stay up to date.</p>
            </div>
        </div>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-2'>
            <div className='flex flex-col sm:flex-row items-center justify-betwwen w-full'>
                <input className='p-3 flex w-full rounded-md text-black' type='email' placeholder='Enter Email'/>
                <button className='bg-purple text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>Notify Me</button>
            </div>
            
        </div>
        <p className='max-w-[1240px] mx-auto grid'>We care about the protection of your data. Read our <span className='text-purple underline-offset-1'>Privacy Policy.</span>   </p>

    </div>
  )
}

export default Newsletter