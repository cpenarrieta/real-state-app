import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { useUser } from "../context/UserContext";
import PropertyCard from "../components/PropertyCard";
import PageHeader from "../components/PageHeader";
import Header from "../components/dashboard/Header";

export const DASHBOARD_QUERY = gql`
  query GetDashboardData {
    dashboard {
      visits {
        today
        yesterday
        last7Days
      }
      leads {
        today
        yesterday
        last7Days
      }
      users {
        today
        yesterday
        last7Days
      }
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
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (user && !user?.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const sessions = data.dashboard?.visits;
  const users = data.dashboard?.users;
  const leads = data.dashboard?.leads;

  return (
    <div>
      <PageHeader title="Dashboard" />

      {sessions && <Header sessions={sessions} users={users} leads={leads} />}

      <div className="mt-5 py-5 font-medium text-md leading-5 rounded-md text-gray-500">
        Last Properties
      </div>
      <div className="">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {data.dashboard.properties.map((property) => (
            <div key={property.uuid}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
