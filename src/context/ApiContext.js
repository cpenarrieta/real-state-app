import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  from,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

export const ApiProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const { getAccessTokenSilently } = useAuth0();

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    } catch (err) {
      console.log(err);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      const unauthorizedErrors = graphQLErrors.filter(
        (error) => error.extensions.code === "UNAUTHENTICATED"
      );
      if (unauthorizedErrors.length) {
        window.location = "/login";
      }
    }

    if (networkError) {
      // TODO
      console.log(`[Network error]: ${networkError}`);
    }
  });

  // TODO figure out order of link
  const link = from([errorLink, authLink, httpLink]);

  const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
