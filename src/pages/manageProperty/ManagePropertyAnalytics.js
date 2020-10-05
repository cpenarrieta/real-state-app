import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";
import AnalyticTabs from "../../components/analytics/AnalyticTabs";

const ANALYTICS_QUERY = gql`
  query PropertyAnalytics($uuid: String!) {
    propertyAnalytics(uuid: $uuid) {
      id
      visits {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
      }
      leads {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
      }
      users {
        today
        yesterday
        last7Days
        last15Days
        last30Days
        last180Days
        totalViews
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

export default function ManagePropertyAnalytics() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(ANALYTICS_QUERY, {
    variables: { uuid: propertyId },
  });
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  if (loading) {
    return <p>loading</p>;
  }

  const sessions = data.propertyAnalytics?.visits;
  const users = data.propertyAnalytics?.users;
  const leads = data.propertyAnalytics?.leads;
  const visitsRaw = data.propertyAnalytics?.visitsRaw;
  const leadsRaw = data.propertyAnalytics?.leadsRaw;
  const usersRaw = data.propertyAnalytics?.usersRaw;

  return (
    <div>
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
