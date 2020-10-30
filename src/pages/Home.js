import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import logo from "../images/original_transparent.png";

export default function Home() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  if (isLoading) {
    return <div className="h-screen flex justify-center">loading logo</div>;
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-logoFont flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center items-center bg-logoPink p-5 rounded-md lg:hidden">
            <a href={process.env.REACT_APP_STATIC_URI}>
              <img className="h-32 w-auto" src={logo} alt="Workflow" />
            </a>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full justify-center inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-logoFont bg-logoPink hover:bg-logoPink focus:outline-none focus:border-logoPink focus:shadow-outline-indigo active:bg-logoPink transition ease-in-out duration-150"
                    onClick={loginWithRedirect}
                  >
                    Sign in
                  </button>
                </span>
              </div>

              <div className="mt-3">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full justify-center inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-logoRed hover:bg-logoRed focus:outline-none focus:border-logoRed focus:shadow-outline-indigo active:bg-logoRed transition ease-in-out duration-150"
                    onClick={signUp}
                  >
                    Create Accountt
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative w-0 flex-1 lg:flex justify-center items-center bg-logoPink">
        <img className="h-40" src={logo} alt="Realtor App Logo" />
      </div>
    </div>
  );
}
