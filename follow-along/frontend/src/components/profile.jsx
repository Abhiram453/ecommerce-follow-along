import React, { useEffect, useState } from "react";
import AddressCard from "./addressCard";
import axios from "axios";
import CreateAddress from "./createAddress";

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [addAddress, setAddAddress] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/checklogin", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProfilePhoto(response.data.message.profilePhoto);
          setPersonalDetails(response.data.message);
          setAddresses(response.data.message.address);
          console.log("User fetched:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const changeProfilePhoto = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    const multiPartFormData = new FormData();
    multiPartFormData.append("photo", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/upload",
        multiPartFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setProfilePhoto(response.data.message.profilePhoto);
        alert("Profile Photo Updated Successfully");
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-800 p-5">
      <div className="w-full h-full bg-neutral-700 rounded-lg border-2 flex flex-col">
        {/* Personal Details Section */}
        <div className="w-full h-max my-2 p-5">
          <div className="w-full h-max">
            <h1 className="text-3xl text-neutral-100">Personal Details</h1>
          </div>
          <div className="w-full h-max flex flex-col sm:flex-row p-5 gap-10">
            <div className="w-40 h-max flex flex-col justify-center items-center gap-y-3">
              <div className="w-full h-max text-2xl text-neutral-100 text-left">
                PICTURE
              </div>
              <img
                src={
                  profilePhoto
                    ? `http://localhost:8080/profile-photo/${profilePhoto}`
                    : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`
                }
                alt="profile"
                className="w-40 h-40 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
                }}
              />
              <label
                htmlFor="upload"
                className="border rounded-2xl p-2 bg-gray-500 text-white cursor-pointer"
              >
                Update Photo
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                onChange={changeProfilePhoto}
              />
            </div>
            <div className="h-max md:flex-grow">
              <div className="w-full h-max flex flex-col justify-center items-center gap-y-3">
                <div className="w-full h-max">
                  <div className="text-2xl text-neutral-100 text-left">NAME</div>
                  <div className="text-lg font-light text-neutral-100 text-left break-all">
                    {personalDetails.name}
                  </div>
                </div>
                <div className="w-full h-max">
                  <div className="text-2xl text-neutral-100 text-left">EMAIL</div>
                  <div className="text-lg font-light text-neutral-100 text-left break-all">
                    {personalDetails.email}
                  </div>
                </div>
                <div className="w-full h-max">
                  <div className="text-2xl text-neutral-100 text-left">MOBILE</div>
                  <div className="text-lg font-light text-neutral-100 text-left break-all">
                    {personalDetails.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="w-full h-max my-2 p-5">
          <div className="w-full h-max">
            <h1 className="text-3xl text-neutral-100">Addresses</h1>
          </div>
          <div className="w-full h-max p-5">
            <button
              onClick={() => setAddAddress(!addAddress)}
              className="w-max px-3 py-2 bg-neutral-600 text-neutral-100 rounded-md text-center hover:bg-neutral-100 hover:text-black transition-all duration-100"
            >
              {addAddress ? "Close Address Form" : "Add Address"}
            </button>
          </div>
          {addAddress && <CreateAddress />}
          <div className="w-full h-max flex flex-col gap-5 p-5">
            {addresses.length === 0 ? (
              <div className="w-full h-max text-neutral-100 font-light text-left">
                No Addresses Found
              </div>
            ) : (
              addresses.map((address) => (
                <AddressCard key={address._id} {...address} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}