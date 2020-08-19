import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div>Home page</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={loginWithRedirect}
        >
          Login
        </button>
      </div>
    </>
  );
}
