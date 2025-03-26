import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4534/product/allproduct");

        if (response.status === 200) {
          setData(response.data.message);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate("/pro", { state: { id } });
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {data.length > 0 ? (
          data.map((product, index) => (
            <ProductCard key={product._id || index} {...product} click={() => handleClick(product._id)} />
          ))
        ) : (
          <p className="text-white text-center col-span-5">No products available.</p>
        )}
      </div>
    </div>
  );
}