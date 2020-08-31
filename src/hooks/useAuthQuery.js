import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAccessToken } from "../context/AccessTokenContext";

export const useAuthQuery = (query, opts) => {
  const { accessToken } = useAccessToken();
  const [getQuery, { loading, error, data }] = useLazyQuery(query, opts);

  useEffect(() => {
    if (accessToken) {
      getQuery();
    }
  }, [accessToken, getQuery]);

  return { loading, error, data };
}
