import React, {useState}from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'


const Navbar = () => {
  const [nav, setNav] = useState(false);
  
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex text-white items-center h-24 justify-between px-4 mx-auto max-w-[1240px]">
      
        <h1 className="text-3xl font-bold w-full text-purple">REACT. LAB</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'>Home</li>
            <li className='p-4'>Company</li>
            <li className='p-4'>Resources</li>
            <li className='p-4'>About</li>
            <li className='p-4'>Contact</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
          

        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[40%] border-r border-r-gray-900 h-full bg-[#000300] ease-in-out duration-500': 'ease-in-out duration-500 fixed left-[-100%]'}>
          <h1 className="text-3xl font-bold w-full text-purple m-3">REACT. LAB</h1>
          <ul className='p-4 uppercase '>
            <li className='p-4 border-b border-gray-600'>Home</li>
            <li className='p-4 border-b border-gray-600'>Company</li>
            <li className='p-4 border-b border-gray-600'>Resources</li>
            <li className='p-4 border-b border-gray-600'>About</li>
            <li className='p-4'>Contact</li>
          </ul>
        </div>
    
        
    </div>
  )
}

export default Navbar