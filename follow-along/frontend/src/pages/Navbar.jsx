import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { IoIosMenu, IoIosClose } from 'react-icons/io';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">E-Commerce</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300 flex items-center">
            <IoHome className="mr-2" />
            Home
          </Link>
          <Link to="/my-products" className="text-white hover:text-gray-300">My Products</Link>
          <Link to="/create" className="text-white hover:text-gray-300">Add Product</Link>
          <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
          <Link to="/login" className="text-white hover:text-gray-300 flex items-center">
            <TbLogin2 className="mr-2" />
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <IoIosClose size={24} /> : <IoIosMenu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block text-white hover:text-gray-300 p-2" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/my-products" className="block text-white hover:text-gray-300 p-2" onClick={toggleMenu}>
            My Products
          </Link>
          <Link to="/create" className="block text-white hover:text-gray-300 p-2" onClick={toggleMenu}>
            Add Product
          </Link>
          <Link to="/cart" className="block text-white hover:text-gray-300 p-2" onClick={toggleMenu}>
            Cart
          </Link>
          <Link to="/login" className="block text-white hover:text-gray-300 p-2" onClick={toggleMenu}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;