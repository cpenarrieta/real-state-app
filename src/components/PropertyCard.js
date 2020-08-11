import React from "react";
import { Link } from "react-router-dom";

const getPropertyBadge = (status, publishedStatus) => {
  if (status === "ACTIVE" && publishedStatus === "PUBLISHED") {
    return ["live", "teal"];
  }
  if (status === "ACTIVE" && publishedStatus === "DRAFT") {
    return ["draft", "yellow"];
  }
  if (status === "SOLD") {
    return ["sold", "orange"];
  }
  if (status === "INACTIVE") {
    return ["inactive", "red"];
  }
  return [status, "gray"];
};

export default function PropertyCard({
  uuid,
  title,
  mainPicture,
  bedrooms,
  bathrooms,
  price,
  status,
  publishedStatus,
  currency,
}) {
  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);
  const formattedPrice = new Intl.NumberFormat("en-us").format(price);

  return (
    <div className="">
      <div className="relative pb-5/6">
        <Link to={`/property/manage/${uuid}`}>
          <img
            className="absolute h-full w-full object-cover rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            src={mainPicture}
            alt={uuid}
          />
        </Link>
      </div>
      <div className="relative px-4 -mt-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            <span
              className={`inline-block bg-${badgeColor}-200 text-${badgeColor}-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
            >
              {badgeText}
            </span>
            <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
              {bedrooms} beds &bull; {bathrooms} baths
            </div>
          </div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate">
            {title}
          </h4>
          <div className="mt-1">
            $ {formattedPrice}
            <span className="text-gray-600 text-xs"> {currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
