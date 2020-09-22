import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { PropertyPage } from "@cpenarrieta/real-state-property-components";

const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      uuid
      title
      price
      currency
      lotSize
      builtYear
      grossTaxesLastYear
      bedrooms
      bathrooms
      propertyType
      description
      listingId
      mainPicture
      mainPictureLowRes
      mainImageId
      status
      publishedStatus
      webPaidUntil
      username
      videoUrl
      videoType
      address1
      zipCode
      city
      province
      community
      country
      lat
      lon
      color
      hidePrice
      strata
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

  const property = data?.property

  return <PropertyPage {...property} />;
}
