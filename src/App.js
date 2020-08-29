import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ApiProvider } from "./context/ApiContext";
import { AccessTokenProvider } from "./context/AccessTokenContext";
import { UserProvider } from "./context/UserContext";

const requestedScopes = [
  "read:dashboard",
  "read:user",
  "edit:user",
  "write:user",
  "read:users",
  "read:property",
  "edit:property",
  "write:property",
  "read:properties",
];

function App() {
  const ManageAppProvider = ({ children }) => {
    return (
      <AccessTokenProvider>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={`${window.location.origin}/verify_user`}
          audience={process.env.REACT_APP_AUTH0_AUDIENCE}
          scope={requestedScopes.join(" ")}
        >
          <ApiProvider>
            <UserProvider>{children}</UserProvider>
          </ApiProvider>
        </Auth0Provider>
      </AccessTokenProvider>
    );
  };

  const AppRouter = () => {
    return (
      <Router>
        <div className="bg-gray-100 h-screen">
          <AppRoutes />
        </div>
      </Router>
    );
  };

  return (
    <ManageAppProvider>
      <AppRouter />
    </ManageAppProvider>
  );
}

export default App;
