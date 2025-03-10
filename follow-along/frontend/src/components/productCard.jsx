import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ _id, email, name, description, category, tags, price, stock, images, role, dele }) {
  let navigate = useNavigate();

  const edit = () => {
    navigate("/create", { state: { _id, email, name, description, category, tags, price, stock, images, role, edit: true } });
  };

  const viewProduct = () => {
    navigate("/product-info", { state: { _id, email, name, description, category, tags, price, stock, images } });
  };

  const editDeleteCom = () => {
    return (
      <div>
        <button onClick={edit} className="w-full text-white px-4 py-1 mt-2 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out">
          Edit
        </button>
        <button onClick={dele} className="w-full text-white px-4 py-1 mt-2 rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300 ease-in-out">
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg hover:cursor-pointer flex flex-col justify-between duration-300 ease-in-out max-w-xs">
      <div className="w-full">
        <img
          src={`http://localhost:4534/products-photo/${images[0]}`}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-3 transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={viewProduct}
        />
        <h2 className="text-md font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 line-clamp-3 opacity-80">{description}</p>
      </div>
      <div className="w-full mt-3">
        <p className="text-md font-semibold text-gray-900">${price}</p>
        <button onClick={viewProduct} className="w-full text-white px-4 py-1 mt-2 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out">
          More Info
        </button>
        {role === "seller" && editDeleteCom()}
      </div>
    </div>
  );
}