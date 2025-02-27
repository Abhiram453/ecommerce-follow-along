import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function SellerProductPage() {
  let [data, setData] = useState([]);
  const [dle, setDle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:4534/products/allproduct");

        if (response.status === 200) {
          setData(response.data.message);
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
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-5 gap-4 p-4">
        {data.map((product, index) => (
          <ProductCard key={index} {...product} role={"seller"} dele={() => dele(product._id)} />
        ))}
      </div>
    </div>
  );
}