import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { DASHBOARD_QUERY } from "../queries/dashboard";

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
  if (error) return <p>Error...</p>;

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
        {savePropertyError && <p>Error... Please try again</p>}
        <button
          type="button"
          onClick={savePropertyOnClick}
          disabled={savePropertyLoading}
        >
          New Property
        </button>
      </div>
      <div className="px-2">
        <div className="flex flex-wrap">
          {data.properties.map((property) => (
            <div
              key={property.uuid}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
