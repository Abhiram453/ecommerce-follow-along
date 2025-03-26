import React from "react";

export default function AddressCard({
  _id,
  country,
  state,
  district,
  pincode,
  area,
}) {
  return (
    <div className="w-full h-max bg-transparent p-5 rounded-lg border border-neutral-600 grid grid-cols-12 gap-5">
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Country
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {country}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            State
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {state}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            District
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {district}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Pincode
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {pincode}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
          <div className="w-full h-max break-all text-xl text-neutral-200">
            Area
          </div>
          <div className="w-full h-max break-all text-lg font-light text-neutral-200">
            {area}
          </div>
        </div>
      </div>
    </div>
  );
}