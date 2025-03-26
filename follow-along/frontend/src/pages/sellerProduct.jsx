import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import axios from "axios";

export default function SellerProductPage() {
  const [data, setData] = useState([]);
  const [dle, setDle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4534/product/allproduct");

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
      const response = await axios.delete(`http://localhost:4534/product/delete/${id}`);

      if (response.status === 200) {
        console.log("Product deleted successfully:", response.data);
        setDle(!dle); // Trigger re-fetch of products
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {data.length > 0 ? (
          data.map((product, index) => (
            <ProductCard
              key={product._id || index}
              {...product}
              role={"seller"}
              dele={() => dele(product._id)}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-5">No products found.</p>
        )}
      </div>
    </div>
  );
}