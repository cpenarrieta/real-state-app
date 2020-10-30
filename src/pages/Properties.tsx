import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import PropertyCard from "../components/PropertyCard";
import PageHeader from "../components/PageHeader";

interface Property {
  uuid: string;
  title: string;
  mainPictureLowRes: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: string;
  publishedStatus: string;
  currency: string;
}

interface PropertyData {
  properties: Property[];
}

export const PROPERTIES_QUERY = gql`
  query GetProperties {
    properties {
      uuid
      title
      mainPictureLowRes
      bedrooms
      bathrooms
      price
      status
      publishedStatus
      currency
    }
  }
`;

export default function Properties() {
  const { loading, error, data } = useQuery<PropertyData>(PROPERTIES_QUERY);
  const [tab, selectTab] = useState("LIVE");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  if (!data?.properties?.length) {
    return <p>no properties</p>;
  }

  let selectedProperties: Property[] = [];
  const soldProperties =
    data?.properties?.filter((p) => p.status === "SOLD") || [];
  const inactiveProperties =
    data?.properties?.filter((p) => p.status === "INACTIVE") || [];
  const draftProperties =
    data?.properties?.filter(
      (p) => p.status === "ACTIVE" && p.publishedStatus === "DRAFT"
    ) || [];
  const liveProperties =
    data?.properties?.filter(
      (p) => p.status === "ACTIVE" && p.publishedStatus === "PUBLISHED"
    ) || [];

  if (tab === "LIVE") {
    selectedProperties = liveProperties;
  } else if (tab === "DRAFT") {
    selectedProperties = draftProperties;
  } else if (tab === "SOLD") {
    selectedProperties = soldProperties;
  } else if (tab === "INACTIVE") {
    selectedProperties = inactiveProperties;
  }

  const notSelected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-logoFont hover:text-gray-700 focus:outline-none focus:text-logoFont focus:bg-logoPink";
  const selected =
    "px-3 py-2 font-medium text-sm leading-5 rounded-md text-logoFont bg-logoPink focus:outline-none focus:text-logoPink focus:bg-logoPink";

  return (
    <div>
      <PageHeader title="Properties" />
      <div className="px-2">
        <div>
          <div className="hidden sm:block">
            <nav className="flex">
              <button
                className={`${tab === "LIVE" ? selected : notSelected}`}
                onClick={() => selectTab("LIVE")}
              >
                Live
              </button>
              <button
                className={`ml-4 ${tab === "DRAFT" ? selected : notSelected}`}
                onClick={() => selectTab("DRAFT")}
              >
                Draft
              </button>
              <button
                className={`ml-4 ${tab === "SOLD" ? selected : notSelected}`}
                aria-current="page"
                onClick={() => selectTab("SOLD")}
              >
                Sold
              </button>
              <button
                className={`ml-4 ${
                  tab === "INACTIVE" ? selected : notSelected
                }`}
                aria-current="page"
                onClick={() => selectTab("INACTIVE")}
              >
                Inactive
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {selectedProperties.map((property) => (
            <div key={property.uuid}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
