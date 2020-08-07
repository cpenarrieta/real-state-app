import React from 'react'
import { useQuery, gql } from "@apollo/client";

const USERS_QUERY = gql`
  query GetUsers {
    users {
      uuid
      email
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Users Admin Page</h2>
      <div>
        {data.users.map((u) => (
          <div key={u.uuid}>{u.email} - {u.uuid}</div>
        ))}
      </div>
    </div>
  );
}
