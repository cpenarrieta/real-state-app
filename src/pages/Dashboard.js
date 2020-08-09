import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

const DASHBOARD_QUERY = gql`
  query GetDashboardData {
    properties {
      uuid
      title
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
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const [
    saveProperty,
    { loading: savePropertyLoading, error: savePropertyError },
  ] = useMutation(NEW_PROPERTY_MUTATION);
  let history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
      history.push(`/property/manage/${propertyUuid}`);
    }
  };

  return (
    <div>
      <div>
        {savePropertyLoading && <p>Loading...</p>}
        {savePropertyError && <p>Error :( Please try again</p>}
        <button
          type="button"
          onClick={savePropertyOnClick}
          disabled={savePropertyLoading}
        >
          New Property
        </button>
      </div>
      <div className="">
        {data.properties.map((property) => (
          <PropertyCard key={property.uuid} {...property} />
        ))}
      </div>
    </div>
  );
}
