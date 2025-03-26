import React from "react";

export default function AddressCard({
  _id,
  country,
  city,
  address,
  pincode,
  addressType,
}) {
  return (
    <div className="w-full h-max bg-transparent p-5 rounded-lg border border-neutral-600 grid grid-cols-12 gap-5">
      {/* Country */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2 p-3">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Country
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {country}
          </div>
        </div>
      </div>

      {/* City */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2 p-3">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            City
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {city}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2 p-3">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Address
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {address}
          </div>
        </div>
      </div>

      {/* Pincode */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2 p-3">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Pincode
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {pincode}
          </div>
        </div>
      </div>

      {/* Address Type */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2 p-3">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Address Type
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {addressType}
          </div>
        </div>
      </div>
    </div>
  );
}