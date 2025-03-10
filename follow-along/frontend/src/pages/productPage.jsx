import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:4534/products/allproduct");

        if (response.status === 200) {
          setProducts(Array.isArray(response.data.message) ? response.data.message : []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            images={product.images.map((img) => `http://localhost:4534/products-photo/${img}`)}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
