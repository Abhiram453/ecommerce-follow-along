import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function SellerProductPage() {
  const [data, setData] = useState([]);
  const [dle, setDle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:4534/products/allproduct");

        if (response.status === 200 && response.data && Array.isArray(response.data.message)) {
          setData(response.data.message);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dle]);

  const dele = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:4534/products/delete/${id}`);
      
      if (response.status === 200) {
        setDle(!dle); 
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-5 gap-4 p-4">
        {data.length > 0 ? (
          data.map((product, index) => (
            <ProductCard key={product._id || index} {...product} role={"seller"} dele={() => dele(product._id)} />
          ))
        ) : (
          <p className="text-white text-center col-span-5">No products found.</p>
        )}
      </div>
    </div>
  );
}
