import React from "react";
import { formatPrice } from "./utils/price";
import { getPropertyBadge } from "./utils/propertyStatus";

export default function Hero({
  title,
  mainPicture,
  price,
  bedrooms,
  bathrooms,
  city,
  province,
  status,
  publishedStatus,
  zipCode,
}) {
  const [badgeText, badgeColor] = getPropertyBadge(status, publishedStatus);

  return (
    <div id="app">
      <div className="bg-white-50 flex">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-48 lg:px-12">
          <div className="xl:max-w-lg xl:ml-auto">
            <img
              className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-72 sm:w-full sm:object-cover sm:object-center lg:hidden"
              src={mainPicture}
              alt="Property Hero"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              {title}
            </h1>
            <h3 className="text-xl font-medium text-gray-500 leading-tight">
              {city}, {province} {zipCode}
            </h3>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-brand-blue">
              {`$ ${formatPrice(price)}`}
            </h1>
            <div className="mt-6 sm:mt-6 flex items-baseline">
              <span
                className={`inline-block ${badgeColor} text-xs px-2 rounded-full uppercase font-semibold tracking-wide`}
              >
                {badgeText}
              </span>
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {bedrooms} beds &bull; {bathrooms} baths
              </div>
            </div>
            <div className="mt-6 sm:mt-6">
              <a
                href="#form-lead-section"
                className="btn bg-brand-blue text-white shadow-lg sm:text-base px-5 py-3 rounded-lg uppercase tracking-wider font-semi-bold"
              >
                Request Info
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 lg:relative">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={mainPicture}
            alt="Property hero"
          />
        </div>
      </div>
    </div>
  );
}
