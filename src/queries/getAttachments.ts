import { gql } from "@apollo/client";

export const ATTACHMENTS_QUERY = gql`
  query Attachments($uuid: String!) {
    attachments(uuid: $uuid) {
      id
      title
      url
    }
  }
`;
