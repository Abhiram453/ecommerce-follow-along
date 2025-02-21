import React from 'react';
import ProductCard from '../components/productCard'; // Ensure the correct import path
import productDetails from '../../data.json'; // Corrected import path

export default function ProductPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productDetails.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}