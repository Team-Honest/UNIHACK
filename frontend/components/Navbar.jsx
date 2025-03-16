import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link"; 
import "../src/app/globals.css"; 

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex text-black bg-white items-center h-24 justify-between px-4 mx-auto max-w-[1240px] ">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        UNIHACK
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li>
          <Link href="/" className="btn btn-animated">
            Home
          </Link>
        </li>
        <li>
          <Link href="/StartGame" className="btn btn-animated">
            Start Game
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="block md:hidden cursor-pointer" onClick={handleNav}>
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 w-[60%] h-full bg-gray-900 text-white p-10 transition-transform duration-300 shadow-xl ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-6 text-xl">
          <li>
            <Link href="/" className="btn btn-animated block text-center" onClick={() => setNav(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/StartGame" className="btn btn-animated block text-center" onClick={() => setNav(false)}>
              Start Game
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
