import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

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
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <a href={process.env.REACT_APP_STATIC_URI}>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                alt="Workflow"
              />
            </a>
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Realtor App
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full justify-center inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
                    className="w-full justify-center inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
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
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
