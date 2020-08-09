import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { logout } = useAuth0();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-500">Real State</h1>
      <button
        type="button"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
}
