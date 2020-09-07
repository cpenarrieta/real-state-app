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
        <div 
          className="grid grid-cols-3 gap-4"
        >
          {data.properties.map((property) => (
            <div
              key={property.uuid}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
