import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PropertyPage from "../components/property/PropertyPage";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
      price
      mainPicture
      status
      publishedStatus
      webPaidUntil
      username
    }
  }
`;

export default function ManagePropertyPreview() {
  const { propertyId } = useParams();
  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { uuid: propertyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <PropertyPage {...data} />;
}
