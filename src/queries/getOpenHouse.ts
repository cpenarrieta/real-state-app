import { gql } from "@apollo/client";

export const OPEN_HOUSE_QUERY = gql`
  query PropertyOpenHouse($uuid: String!) {
    propertyOpenHouse(uuid: $uuid) {
      id
      date
      timeStart
      timeEnd
    }
  }
`;
