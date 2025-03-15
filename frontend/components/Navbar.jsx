import React, {useState}from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import "../src/app/globals.css"
const Navbar = () => {
  const [nav, setNav] = useState(false);
  
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex text-black bg-white items-center h-24 justify-between px-4 mx-auto max-w-[1240px]">
      <h1 className="text-3xl font-bold w-full justify-between">UNIHACK</h1>
      {/* <ul className='hidden md:flex text-xl w-auto '>
            <li className='p-4 hover:transform transition duration-300 hover:scale-130'>Home</li>
            <li className='p-4 text-yellow-400 hover:transform transition duration-300 hover:scale-130'>Start Game</li>
         
        </ul> */}
      <ul className="flex space-x-6 text-xl">
        <li className="p-4 hover:transform transition duration-300 hover:scale-110 hover:text-orange-500 ">
          Home
        </li>
        <li className="p-4 text-yellow-400 hover:transform transition duration-300 hover:scale-110 hover: text-orange-500 ">
          Start Game
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[40%] border-r border-r-gray-900 h-full bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="text-3xl font-bold w-full text-purple m-3">
          REACT. LAB
        </h1>
        <ul className="p-4 uppercase w-auto ">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Start Game</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar

