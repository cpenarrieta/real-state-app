import React from "react";

export default function DestinationCard({ imageUrl, imageAlt, city, price }) {
  return (
    <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
      <img className="h-32 w-32 flex-shrink-0" src={imageUrl} alt={imageAlt} />
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">{city}</h3>
        <p className="text-gray-600">$ {price}</p>
        <div className="mt-4">
          <button
            className="text-indigo-500 hover:text-indigo-400 font-semibold text-sm"
            type="button"
          >
            Explore 5 properties
          </button>
        </div>
      </div>
    </div>
  );
}
