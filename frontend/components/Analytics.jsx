import React from 'react'
import Laptop from '../assets/laptop.jpg'

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4'   src={Laptop} alt='/'  />
        <div className='flex flex-col justify-center items-center'>
          <p className='text-purple text-xl text-bold py-2 '>DATA ANALYTICS DASHBOARD</p>
          <h1 className='py-5 font-bold text-2xl sm:text-3xl '>Manage Data Analytics Centrally</h1>
          <p className='justify-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ratione tempora nam illo. Vel quas quisquam, inventore autem sint nisi mollitia minus maxime accusamus amet illo aliquam quibusdam possimus adipisci.</p>
          <button className='bg-purple w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>
      </div>

    </div>
  )
}

export default Analytics