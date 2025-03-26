import React, { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:4534/cart`, {
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

  const updateCartQuantity = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.productId._id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full justify-center items-center flex">
        <div className="w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col">
          <div className="w-full h-16 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Cart</h1>
          </div>
          {console.log(products, "pro")}
          <div className="w-full flex-grow overflow-auto px-3 py-2 gap-y-2">
            {products.length === 0 ? (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
              products.map((product) => (
                <CartProduct
                  key={product._id}
                  {...product}
                  updateCartQuantity={updateCartQuantity}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;