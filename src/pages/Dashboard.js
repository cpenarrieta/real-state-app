import React from "react";
import { useQuery } from "@apollo/client";
import PropertyCard from "../components/PropertyCard";
import { DASHBOARD_QUERY } from "../queries/dashboard";

export default function Dashboard() {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <div className="px-2">
        <div className="flex flex-wrap">
          {data.properties.map((property) => (
            <div
              key={property.uuid}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 m-2"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
