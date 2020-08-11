import { gql } from "@apollo/client";

export const DASHBOARD_QUERY = gql`
  query GetDashboardData {
    properties {
      uuid
      title
      mainPicture
      bedrooms
      bathrooms
      price
      status
      publishedStatus
      currency
    }
  }
`;
