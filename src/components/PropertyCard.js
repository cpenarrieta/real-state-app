import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({
  uuid,
  title,
  mainPicture,
  bedrooms,
  bathrooms,
  price,
}) {
  return (
    <div>
      <div className="relative pb-5/6">
        <Link to={`/property/manage/${uuid}`}>
          <img
            className="absolute h-full w-full object-cover rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            src={mainPicture}
            alt={uuid}
          />
        </Link>
      </div>
      <div className="relative px-4 -mt-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
              New
            </span>
            <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
              {bedrooms} beds &bull; {bathrooms} baths
            </div>
          </div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
            {title}
          </h4>
          <div className="mt-1">
            {price}
            <span className="text-gray-600 text-sm"> CAD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
