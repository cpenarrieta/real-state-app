import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { DASHBOARD_QUERY } from "../queries/dashboard";
import { useUser } from "../context/UserContext";
import PageHeader from '../components/PageHeader'

export default function Dashboard() {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (user && !user?.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <PageHeader title="Dashboard" />
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
