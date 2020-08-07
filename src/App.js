import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ApiProvider } from "./context/ApiContext";

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
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={`${window.location.origin}/verify_user`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={requestedScopes.join(" ")}
    >
      <ApiProvider>
        <Router>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </Router>
      </ApiProvider>
    </Auth0Provider>
  );
}

export default App;
