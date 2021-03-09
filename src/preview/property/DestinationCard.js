import React from "react";
import { formatPrice } from "./utils/price";
import { getColorThemeText } from "./utils/colorTheme";

export default function DestinationCard({
  imageUrl,
  imageAlt,
  city,
  price,
  title,
  bedrooms,
  bathrooms,
  uuid,
  username,
  color,
}) {
  const [, colorSec] = getColorThemeText(color);

  return (
    <a href={`/${username}/${uuid}`} rel="noopener noreferrer">
      <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden h-32 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        {imageUrl && <img
          src={imageUrl}
          alt={imageAlt}
          width={128}
          height={128}
          className="h-32 w-32 flex-shrink-0"
        />}

        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <h3 className="text-sm font-semibold text-gray-500">{city}</h3>
          <p className={`text-gray-600 mt-2 ${colorSec}`}>
            $ {formatPrice(price)}
          </p>
          <div className="mt-2">
            <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
              {bedrooms} beds &bull; {bathrooms} baths
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
