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
        <>
            <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="text-[24px] font-semibold text-center">Add Address</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="pb-1 block">Country</label>
                        <input
                            type="text"
                            value={country}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter country"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">State</label>
                        <input
                            type="text"
                            value={state}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Enter state"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">District</label>
                        <input
                            type="text"
                            value={district}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="Enter district"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Pin Code</label>
                        <input
                            type="number"
                            value={pincode}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Enter pin code"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Area</label>
                        <input
                            type="text"
                            value={area}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="Enter area"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateAddress;