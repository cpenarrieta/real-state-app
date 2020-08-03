import React from "react";
import { useQuery, gql } from "@apollo/client";

const USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      firstName
    }
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Dashboard Page</h2>
      <div>
        {data.users.map((u) => (
          <div key={u.id}>{u.email}</div>
        ))}
      </div>
    </div>
  );
}
