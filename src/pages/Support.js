import React from "react";
import PageHeader from "../components/PageHeader";
import { useUser } from "../context/UserContext";

export default function Support() {
  const useUserCtx = useUser();
  const user = useUserCtx?.user;

  let fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
  if (fullName === " ") fullName = "";

  return (
    <div>
      <PageHeader title="Support" />

      <div className="relative ">
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                We're here to help
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Leave us a message and we'll get back to you as soon as
                possible. Thanks.
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <a href={`mailto:hello@realtorapp.co`}>
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                    <a href={`mailto:hello@realtorapp.co`}>
                      <span className={`ml-3`}>hello@realtorapp.co</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
