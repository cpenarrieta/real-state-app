import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { useUser } from "../context/UserContext";
import PropertyCard from "../components/PropertyCard";
import PageHeader from "../components/PageHeader";
import Header from "../components/dashboard/Header";
import { AnalyticRaw, PropertyDashboard } from "../types";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const DASHBOARD_QUERY = gql`
  query GetDashboardData {
    dashboard {
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

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty {
    saveProperty {
      uuid
    }
  }
`;

export default function Dashboard() {
  const history = useHistory();
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const [saveProperty, { error: savePropertyError }] = useMutation(
    NEW_PROPERTY_MUTATION
  );
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  if (user && !user?.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

  if (loading) return <Loading />;
  if (error || savePropertyError) return <Error />;

  const visitsRaw: AnalyticRaw[] = data.analytics?.visitsRaw;
  const leadsRaw: AnalyticRaw[] = data.analytics?.leadsRaw;
  const usersRaw: AnalyticRaw[] = data.analytics?.usersRaw;

  const savePropertyOnClick = async () => {
    const propertyResponse = await saveProperty({
      variables: {
        property: {
          uuid: null,
        },
      },
    });

    const propertyUuid = propertyResponse?.data?.saveProperty?.uuid;

    if (propertyUuid) {
      history.push(`/manage-property/${propertyUuid}`);
    }
  };

  if (data?.dashboard?.properties?.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-logoFont sm:text-4xl sm:leading-10">
          You don't have any properties yet{" "}
          <span role="img" aria-label="party">
            🏠
          </span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={savePropertyOnClick}
              className="inli ne-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-logoRed hover:bg-logoRed-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Create your first Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" />

      {visitsRaw && visitsRaw.length > 0 && (
        <Header visitsRaw={visitsRaw} leadsRaw={leadsRaw} usersRaw={usersRaw} />
      )}

      <div className="mt-5 py-5 font-medium text-md leading-5 rounded-md text-gray-500">
        Last Properties
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {data.dashboard.properties.map((property: PropertyDashboard) => (
            <div key={property.uuid}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
