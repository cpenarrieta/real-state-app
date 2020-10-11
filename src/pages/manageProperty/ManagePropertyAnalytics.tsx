import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";
import AnalyticTabs from "../../components/analytics/AnalyticTabs";
import { AnalyticRaw } from "../../types";

const ANALYTICS_QUERY = gql`
  query PropertyAnalytics($uuid: String!) {
    propertyAnalytics(uuid: $uuid) {
      id
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
  const { propertyId } = useParams<{ propertyId: string }>();
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

  const visitsRaw: AnalyticRaw[] = data.propertyAnalytics?.visitsRaw;
  const leadsRaw: AnalyticRaw[] = data.propertyAnalytics?.leadsRaw;
  const usersRaw: AnalyticRaw[] = data.propertyAnalytics?.usersRaw;

  return (
    <div>
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