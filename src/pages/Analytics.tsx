import React from "react";
import { useQuery, gql } from "@apollo/client";
import PageHeader from "../components/PageHeader";
import AnalyticTabs from "../components/analytics/AnalyticTabs";

export const ANALYTICS_QUERY = gql`
  query GetAnalyticsData {
    analytics {
      visits {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
      }
      leads {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
      }
      users {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
      }
      visitsRaw {
        day
        count
      }
      leadsRaw {
        day
        count
      }
      usersRaw {
        day
        count
      }
    }
  }
`;

export default function Analytics() {
  const { loading, error, data } = useQuery(ANALYTICS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const sessions = data.analytics?.visits;
  const users = data.analytics?.users;
  const leads = data.analytics?.leads;
  const visitsRaw = data.analytics?.visitsRaw;
  const leadsRaw = data.analytics?.leadsRaw;
  const usersRaw = data.analytics?.usersRaw;

  return (
    <div>
      <PageHeader title="Analytics" />

      {sessions && (
        <AnalyticTabs
          sessions={sessions}
          users={users}
          leads={leads}
          visitsRaw={visitsRaw}
          leadsRaw={leadsRaw}
          usersRaw={usersRaw}
        />
      )}
    </div>
  );
}
