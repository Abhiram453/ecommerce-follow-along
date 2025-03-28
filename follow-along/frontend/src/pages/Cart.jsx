import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/cart`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.message.cart);
        console.log("Products fetched:", data.message.cart);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchCart();
  }, []);

  const handleNavigate = () => {
    navigate("/order");
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full justify-center items-center flex">
        <div className="w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col">
          {/* Cart Header */}
          <div className="w-full h-16 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Cart</h1>
          </div>

          {/* Cart Products */}
          <div className="w-full flex-grow overflow-auto px-3 py-2 gap-y-2">
            {products.length === 0 ? (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
              products.map((product) => (
                <CartProduct key={product._id} {...product} />
              ))
            )}
          </div>

          {/* Checkout Button */}
          <div className="w-full p-4 flex justify-end">
            <button
              onClick={handleNavigate}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;