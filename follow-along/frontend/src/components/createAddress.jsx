import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAddress = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      country,
      state,
      district,
      pincode,
      area,
    };

    console.log(addressData);

    try {
      const response = await axios.put(
        "http://localhost:4534/user/add-address",
        addressData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Address added successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address. Please check the data and try again.");
    }
  };

  return (
    <div className="w-[90%] max-w-[500px] bg-neutral-800 shadow-lg h-auto rounded-lg p-6 mx-auto">
      <h5 className="text-[24px] font-semibold text-center text-neutral-200">
        Add Address
      </h5>
      <form onSubmit={handleSubmit}>
        {/* Country */}
        <div className="mt-4">
          <label className="pb-1 block text-neutral-300">Country</label>
          <input
            type="text"
            value={country}
            className="w-full p-2 border border-neutral-600 rounded bg-neutral-700 text-neutral-200"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
            required
          />
        </div>

        {/* State */}
        <div className="mt-4">
          <label className="pb-1 block text-neutral-300">State</label>
          <input
            type="text"
            value={state}
            className="w-full p-2 border border-neutral-600 rounded bg-neutral-700 text-neutral-200"
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
            required
          />
        </div>

        {/* District */}
        <div className="mt-4">
          <label className="pb-1 block text-neutral-300">District</label>
          <input
            type="text"
            value={district}
            className="w-full p-2 border border-neutral-600 rounded bg-neutral-700 text-neutral-200"
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            required
          />
        </div>

        {/* Pincode */}
        <div className="mt-4">
          <label className="pb-1 block text-neutral-300">Pin Code</label>
          <input
            type="number"
            value={pincode}
            className="w-full p-2 border border-neutral-600 rounded bg-neutral-700 text-neutral-200"
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pin code"
            required
          />
        </div>

        {/* Area */}
        <div className="mt-4">
          <label className="pb-1 block text-neutral-300">Area</label>
          <input
            type="text"
            value={area}
            className="w-full p-2 border border-neutral-600 rounded bg-neutral-700 text-neutral-200"
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default CreateAddress;