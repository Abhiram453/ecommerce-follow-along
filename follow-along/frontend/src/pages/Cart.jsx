import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:4534/cart', {
          withCredentials: true,
        });
        setCart(response.data.message.cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleIncreaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:4534/cart/increase',
        { productId },
        { withCredentials: true }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      await axios.post(
        'http://localhost:4534/cart/decrease',
        { productId },
        { withCredentials: true }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <div key={item.productId._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={`http://localhost:4534/products-photo/${item.productId.images[0]}`}
                alt={item.productId.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold">{item.productId.name}</h2>
              <p className="text-gray-600">Price: ₹{item.productId.price}</p>
              <div className="flex items-center mt-3">
                <button
                  onClick={() => handleDecreaseQuantity(item.productId._id)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-2 border-t border-b">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item.productId._id)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;