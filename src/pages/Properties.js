import React from "react";
import { gql, useQuery } from "@apollo/client";
import PropertyCard from "../components/PropertyCard";

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
  const { loading, error, data } = useQuery(PROPERTIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <div className="px-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {data.properties.map((property) => (
            <div key={property.uuid}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
