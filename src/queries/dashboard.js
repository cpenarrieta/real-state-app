import { gql } from "@apollo/client";

export const DASHBOARD_QUERY = gql`
  query GetDashboardData {
    dashboard {
      visits {
        today
        yesterday
        last7Days
      }
      leads {
        today
        yesterday
        last7Days
      }
      users {
        today
        yesterday
        last7Days
      }
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
  }
`;
