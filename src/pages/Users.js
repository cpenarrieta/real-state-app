import React from 'react'
import { useQuery, gql } from "@apollo/client";
import Loading from '../components/Loading'
import Error from '../components/Error'

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

  if (loading) return <Loading />;
  if (error) return <Error />;

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
