import React from "react";
import DestinationCard from "./DestinationCard";

export default function OtherProperties({
  otherProperties,
  userFirstName,
  color,
  username,
}) {
  return (
    <div className="bg-white-50">
      <div className="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
              More from {userFirstName}
            </h2>
          </div>
          <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:col-gap-6 sm:row-gap-12 sm:space-y-0 lg:grid-cols-3 lg:col-gap-8">
            {otherProperties.map((other, key) => {
              return (
                <li key={`${key}-other-${other.title}`}>
                  <div className="space-y-4">
                    <DestinationCard
                      imageUrl={other.mainPictureLowRes || ""}
                      title={other.title}
                      city={other.city}
                      price={other.hidePrice ? "" : other.price}
                      bedrooms={other.bedrooms}
                      bathrooms={other.bathrooms}
                      uuid={other.uuid}
                      username={username}
                      imageAlt="other property"
                      color={color}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
