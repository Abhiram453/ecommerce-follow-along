import React from 'react';

export default function ProductCard({ name, image, description, price, onAddToCart }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="w-full relative">
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover rounded-xl"
        />
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-full shadow-md">
          ${price}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{description}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full text-white px-5 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-900 transition-all">
          More Info
        </button>
        <button 
          onClick={onAddToCart} 
          className="w-full text-white px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-700 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
}