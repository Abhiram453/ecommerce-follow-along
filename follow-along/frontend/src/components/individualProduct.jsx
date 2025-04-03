import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

const IndividualProduct = () => {
  const location = useLocation();
  const id = location.state.id;
  console.log("Product ID:", id);

  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/individualproduct/${id}`
        );

        if (response.status === 200) {
          setProduct(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/product/cart",
        {
          productId: id,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Added to cart successfully");
        setAdd(true);
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Images */}
      {product.images && (
        <div className="relative">
          <img
            src={`http://localhost:8080/products-photo/${product.images[currentImageIndex]}`}
            alt="Product"
            className="w-full h-64 object-cover"
          />
          {product.images.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                <FaArrowLeft />
              </button>
              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>
      )}

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">Price: ₹{product.price}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-3">
          <label className="mr-2 font-semibold">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleClick}
          className={`mt-4 px-4 py-2 rounded w-full text-white ${
            add
              ? "bg-blue-300 hover:bg-blue-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {add ? "Added To Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default IndividualProduct;