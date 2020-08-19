import React, { useContext, useState, useMemo } from "react";

const AccessTokenContext = React.createContext();

const useAccessToken = () => useContext(AccessTokenContext);

function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const value = useMemo(() => ({ accessToken, setAccessToken }), [
    accessToken,
    setAccessToken,
  ]);

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export { useAccessToken, AccessTokenProvider };
