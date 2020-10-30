import React from "react";
import { Link } from "react-router-dom";
import { getPropertyBadge } from "../util/propertyStatus";
import propertyDefault from "../images/home-default.png";

type PropertyCardProps = {
  uuid?: string;
  title?: string;
  mainPictureLowRes?: string;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  status?: string;
  publishedStatus?: string;
  currency?: string;
};

export default function PropertyCard({
  uuid,
  title,
  mainPictureLowRes,
  bedrooms,
  bathrooms,
  price,
  status,
  publishedStatus,
  currency,
}: PropertyCardProps) {
  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);
  const formattedPrice = new Intl.NumberFormat("en-us").format(price || 0);

  return (
    <div className="">
      <div className="relative pb-5/6">
        <Link to={`/manage-property/${uuid}`}>
          <img
            className="absolute h-full w-full object-cover rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            src={mainPictureLowRes || propertyDefault}
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
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-logoFont">
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
