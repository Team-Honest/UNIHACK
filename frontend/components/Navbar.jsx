import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link"; // Use Next.js Link instead of react-router-dom
import "../src/app/globals.css"; 

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex text-black bg-white items-center h-24 justify-between px-4 mx-auto max-w-[1240px]">
      <h1 className="text-3xl font-bold w-full">UNIHACK</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-xl">
        <li className="p-4 hover:scale-110 transition duration-300 hover:text-orange-500">
          <Link href="/">Home</Link>
        </li>
        <li className="p-4 text-yellow-400 hover:scale-110 transition duration-300">
          <Link href="/StartGame">Start Game</Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="block md:hidden" onClick={handleNav}>
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 w-[60%] h-full bg-gray-800 text-white p-10 transition-transform duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-6 text-xl">
          <li className="hover:text-orange-400">
            <Link href="/" onClick={() => setNav(false)}>Home</Link>
          </li>
          <li className="text-yellow-400 hover:text-yellow-300">
            <Link href="/StartGame" onClick={() => setNav(false)}>Start Game</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;