import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4534/user/profile", {
          withCredentials: true,
        });
        setUser(response.data.message);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={`http://localhost:4534/profile-photo/${user.photo}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Addresses</h3>
          {user.address ? (
            <div>
              <p>{user.address.country}</p>
              <p>{user.address.state}</p>
              <p>{user.address.district}</p>
              <p>{user.address.pincode}</p>
              <p>{user.address.area}</p>
            </div>
          ) : (
            <p>No address found</p>
          )}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Add Address
        </button>
      </div>
    </div>
  );
};

export default Profile;