import React, { useContext, useState, useMemo, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const ME_QUERY = gql`
  query MeQuery {
    me {
      email
      firstName
      lastName
      phone
      address
      address1
      address2
      city
      province
      zipCode
      country
      pictureLowRes
    }
  }
`;

const UserContext = React.createContext();

const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const { data, loading } = useQuery(ME_QUERY);
  const [user, setUser] = useState(data?.me);
  const value = useMemo(() => ({ user }), [user]);

  useEffect(() => {
    if (data?.me) {
      setUser(data?.me);
    }
  }, [data]);

  if (loading) {
    return <p>loading</p>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { useUser, UserProvider };
