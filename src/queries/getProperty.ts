import { gql } from "@apollo/client";

export const PROPERTY_QUERY = gql`
  query GetProperty($uuid: String!) {
    property(uuid: $uuid) {
      title
      uuid
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
      openHouseActive
    }
  }
`;
