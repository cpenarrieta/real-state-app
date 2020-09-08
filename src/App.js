import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ApiProvider } from "./context/ApiContext";
import { AccessTokenProvider } from "./context/AccessTokenContext";
import { AlertProvider } from "./context/AlertContext";

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
  return (
    <AccessTokenProvider>
      <AlertProvider>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={`${window.location.origin}/verify_user`}
          audience={process.env.REACT_APP_AUTH0_AUDIENCE}
          scope={requestedScopes.join(" ")}
        >
          <Router>
            <ApiProvider>
              <div className="bg-gray-100 h-screen">
                <AppRoutes />
              </div>
            </ApiProvider>
          </Router>
        </Auth0Provider>
      </AlertProvider>
    </AccessTokenProvider>
  );
}

export default App;
