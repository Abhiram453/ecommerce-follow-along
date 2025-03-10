import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductInfo = () => {
  const location = useLocation();
  const product = location.state || {};
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to the cart`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:4534/products-photo/${product.images[0]}`}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <div className="flex items-center mb-4">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 w-20 rounded-md"
              min="1"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;