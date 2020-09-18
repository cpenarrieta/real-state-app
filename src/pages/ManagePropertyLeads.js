import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_LEADS = gql`
  query GetLeads($uuid: String!) {
    propertyLeads(uuid: $uuid) {
      id
      name
      phone
      email
      visitorId
      leadStatus
      createdAt
      updatedAt
      order
    }
  }
`;

export default function ManagePropertyLeads() {
  const { propertyId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_LEADS, {
    variables: { uuid: propertyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const {
    id,
    name,
    phone,
    email,
    visitorId,
    leadStatus,
    createdAt,
    updatedAt,
    order,
  } = data?.propertyLeads;

  return <div>ManageProperty Leads</div>;
}
