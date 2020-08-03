import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <>
      <div>Home page</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={loginWithRedirect}
        >
          {isAuthenticated ? "Go To Dashboard" : "Login"}
        </button>
      </div>
    </>
  );
}
