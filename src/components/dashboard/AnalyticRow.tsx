import React from "react";
import { Link } from "react-router-dom";

type AnalyticRowProps = {
  sessions: string;
  users: string;
  leads: string;
  tab: string;
};

export default function AnalyticRow({
  sessions,
  users,
  leads,
  tab,
}: AnalyticRowProps) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        to={{
          pathname: "/analytics",
          state: { tab },
        }}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-logoRed rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    Sessions
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl leading-8 font-semibold text-logoFont">
                      {sessions}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link
        to={{
          pathname: "/analytics",
          state: { tab },
        }}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-logoRed rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    Users
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl leading-8 font-semibold text-logoFont">
                      {users}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link
        to={{
          pathname: "/leads",
          state: { tab },
        }}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-logoRed rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    Leads
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl leading-8 font-semibold text-logoFont">
                      {leads}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
