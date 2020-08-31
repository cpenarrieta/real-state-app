import React, { useEffect, useCallback, useState } from "react";
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
import { useAccessToken } from "../context/AccessTokenContext";

export const ApiProvider = ({ children }) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const { getAccessTokenSilently } = useAuth0();
  const [tokenError, setTokenError] = useState(false);

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      setTokenError(false);
      setAccessToken(token);
    } catch (err) {
      // TODFO report bugsnag
      setTokenError(true);
    }
  }, [getAccessTokenSilently, setAccessToken]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  });

  const authLink = setContext((_, { headers, operation }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        const unauthorizedErrors = graphQLErrors.filter(
          (error) => error.extensions.code === "UNAUTHENTICATED"
        );
        if (unauthorizedErrors.length) {
          getAccessToken();
          return forward(operation);
        }
      } else if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  // TODO figure out order of link
  // const link = from([errorLink, authLink, httpLink]);
  const link = from([errorLink, authLink, httpLink]);

  const apolloClient = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  if (accessToken && !tokenError) {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  } else if (tokenError) {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  } else {
    return <p>Loading...</p>;
  }
};
