import { gql } from "@apollo/client";

export const DASHBOARD_QUERY = gql`
  query GetDashboardData {
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
`;
