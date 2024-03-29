import React from "react";
import { useQuery, gql } from "@apollo/client";
import PageHeader from "../components/PageHeader";
import AnalyticTabs from "../components/analytics/AnalyticTabs";
import { AnalyticRaw } from "../types";
import Loading from '../components/Loading'
import Error from '../components/Error'

export const ANALYTICS_QUERY = gql`
  query GetAnalyticsData {
    analytics {
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

  if (loading) return <Loading />;
  if (error) return <Error />;

  const visitsRaw: AnalyticRaw[] = data.analytics?.visitsRaw;
  const leadsRaw: AnalyticRaw[] = data.analytics?.leadsRaw;
  const usersRaw: AnalyticRaw[] = data.analytics?.usersRaw;

  return (
    <div>
      <PageHeader title="Analytics" />

      {visitsRaw && visitsRaw.length > 0 && (
        <AnalyticTabs
          visitsRaw={visitsRaw}
          leadsRaw={leadsRaw}
          usersRaw={usersRaw}
        />
      )}
    </div>
  );
}
