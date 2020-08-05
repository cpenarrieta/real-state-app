import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { logout } = useAuth0();

  return (
    <div>
      <button
        type="button"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
}
